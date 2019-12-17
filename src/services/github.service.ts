import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import openLink from '../utils/openLink';

export class GithubService {
  private readonly userAgent = 'Blueprint by Gribadze';
  private readonly scopeList = 'repo user';
  private readonly clientId = '80e62e5416dc0df6cdaa';
  private readonly clientSecret = '33db867021ab7ba761b3603096ff5992a92d4a6b';

  private tokenType?: string;
  private accessToken?: string;
  private grantedScope?: string;

  public async authorize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const server = http.createServer();

      server.listen(3000, () => {
        openLink(
          'https://github.com/login/oauth/authorize' +
            `?client_id=${this.clientId}` +
            `&redirect_uri=http://localhost:3000/callback` +
            `&scope=${this.scopeList}`,
        );

        server.on('request', (req, res) => {
          const { query } = url.parse(req.url, true);
          if (query && query.code) {
            res.write('Successfully authenticated');
            res.end();
            server.unref();
            resolve(query.code);
          }
        });

        server.on('error', (err) => {
          server.unref();
          reject(err);
        });
      });
    });
  }

  public async getAccessToken(code: string): Promise<void> {
    const data = await this.apiCall(
      'https://github.com/login/oauth/access_token' +
        `?client_id=${this.clientId}` +
        `&client_secret=${this.clientSecret}` +
        `&code=${code}`,
      'POST',
      {
        accept: 'application/json',
      },
    );
    this.accessToken = data.access_token;
    this.tokenType = data.token_type;
    this.grantedScope = data.scope;
  }

  private async apiCall(path: string, method: string = 'GET', headers: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = https.get(
        `${path}`,
        {
          headers: {
            'User-Agent': this.userAgent,
            ...headers,
          },
          method,
        },
        (res) => {
          let responseData = '';
          res.on('data', (data) => {
            responseData += data.toString();
          });

          res.on('end', () => {
            if (
              res.headers['content-type'] &&
              res.headers['content-type'].includes('application/json')
            ) {
              return resolve(JSON.parse(responseData.toString()));
            }
            resolve(responseData.toString());
          });
        },
      );

      request.on('error', (err) => {
        reject(err);
      });
    });
  }
}

const service = new GithubService();
service.authorize().then((code) => service.getAccessToken(code));
