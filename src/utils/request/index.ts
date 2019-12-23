import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';

type TRequestOptions = http.RequestOptions;
type TIncomingMessage = http.IncomingMessage;
type TRequestCallbackFunction = typeof http.request;
type TRequestAsyncFunction = (url: string | URL, options: TRequestOptions) => Promise<any>;
interface IRequestSelector {
  http: TRequestCallbackFunction;
  https: TRequestCallbackFunction;
}

const requestSelector: IRequestSelector = {
  http: http.request,
  https: https.request,
};

function getProtocolString(url: string): string {
  const matched = url.match(/^(.*):\/\/.*$/);
  if (matched) {
    return matched[1];
  }
  return 'https';
}

function getProtocolUrl(url: URL): string {
  return url.protocol;
}

const requestAsync: TRequestAsyncFunction = (
  url: string | URL,
  options: TRequestOptions,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const protocol = url instanceof URL ? getProtocolUrl(url) : getProtocolString(url);
    const clientRequest = requestSelector[protocol as keyof IRequestSelector](
      url,
      options,
      (res: TIncomingMessage) => {
        let responseData = '';
        res.on('data', (data) => {
          responseData += data;
        });

        res.on('end', () => {
          resolve(responseData);
        });

        res.on('error', (err) => {
          reject(err);
        });
      },
    );

    clientRequest.on('error', (err) => {
      reject(err);
    });
  });
};

const requestProxyHandler = {
  get: (target: any, name: string) => (url: string | URL, options: TRequestOptions) =>
    requestAsync(url, { method: name, ...options }),
};

const request = new Proxy({}, requestProxyHandler);

export default request;
