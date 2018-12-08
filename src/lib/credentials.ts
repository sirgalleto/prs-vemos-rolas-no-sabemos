import * as NetRC from 'netrc-rw';

interface Credentials {
  clientId:string;
  clientSecret: string
}

const endpoint:string = 'pvrns.spotify'

namespace Client {
  export function get() {
    const credentials = NetRC.host(endpoint) || {};
    return credentials;
  }

  export function set(credentials: Credentials) {
    const config = NetRC.hasHost(endpoint)
      ? NetRC.host(endpoint)
      : NetRC.addHost(endpoint);

    config.clientId = credentials.clientId;
    config.clientSecret = credentials.clientSecret;

    NetRC.write();
  }
}

export default Client
