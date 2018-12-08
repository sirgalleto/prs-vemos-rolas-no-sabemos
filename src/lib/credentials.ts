import * as NetRC from 'netrc-rw';

interface Credentials {
  clientId:string;
  clientSecret: string
}

const endpoint:string = 'pvrns.spotify'

namespace Client {
  export function get() {
    const credentials = NetRC.host(endpoint) || {};

    return {
      clientId: credentials.login,
      password: credentials.password,
    };
  }

  export function set(credentials: Credentials) {
    const config = NetRC.hasHost(endpoint)
      ? NetRC.host(endpoint)
      : NetRC.addHost(endpoint);

    config.login = credentials.clientId;
    config.password = credentials.clientSecret;

    NetRC.write();
  }
}

export default Client
