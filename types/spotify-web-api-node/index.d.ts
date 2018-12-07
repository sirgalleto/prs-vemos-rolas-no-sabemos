declare module "spotify-web-api-node" {
  export default class SpotifyWebApi {
    constructor(credentials: any);
    setAccessToken(accessToken: string): void;
    createAuthorizeURL(scopes: string[], state: string): string;
  }

  export interface Credentials {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }

}
