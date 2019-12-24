import * as http from 'http';
import * as url from 'url';
import openLink from '../utils/openLink';
import request from '../utils/request';

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
    const response = await request.post(
      'https://github.com/login/oauth/access_token' +
        `?client_id=${this.clientId}` +
        `&client_secret=${this.clientSecret}` +
        `&code=${code}`,
      {
        headers: {
          'User-Agent': this.userAgent,
        },
      },
    );
    const { access_token, token_type, scope } = JSON.parse(response);
    this.accessToken = access_token;
    this.tokenType = token_type;
    this.grantedScope = scope;
  }

  public async createRemoteRepository(name: string): Promise<void> {
    const response = await request.post('https://api.github.com/user/repos', {
      body: {
        name,
        private: false,
        visibility: 'public',
      },
      headers: {
        Authorization: `token ${this.accessToken}`,
        accept: 'application/vnd.github.v3+json',
      },
    });
    return response.toString();
  }
}

const service = new GithubService();
service
  .authorize()
  .then((code) => service.getAccessToken(code))
  .then(() => service.createRemoteRepository(`new-repo-${Date.now()}`));
