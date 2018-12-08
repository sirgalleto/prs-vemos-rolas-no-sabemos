import * as SpotifyWebApi from "spotify-web-api-node";
import * as express from "express";
import cli from "cli-ux";

const config = {
  port: 9090,
  redirectUri: "http://localhost:9090"
};

export default class SpotifyService {
  spotifyApi: any;

  constructor(credentials: any) {
    this.spotifyApi = new SpotifyWebApi({
      ...credentials,
      redirectUri: config.redirectUri
    });
  }

  async authorizeUserFlow() {
    const scopes = [
      "playlist-read-private",
      "playlist-modify-private",
      "playlist-modify-public"
    ];

    const authorizeUrl: string = this.spotifyApi.createAuthorizeURL(
      scopes,
      "login"
    );

    cli.open(authorizeUrl);

    let server: any;
    const app = express();

    return new Promise((resolve, reject) => {
      app.get("/", async ({ query: { code } }, res) => {
        try {
          await this.codeGrant(code);
        } catch (error) {
          reject(error);
        }
        server.close();
        res.send("You can come back to the cli now!!");
        resolve();
      });

      server = app.listen(config.port);

      setTimeout(() => {
        reject("Timeout");
      }, 500000);
    });
  }

  async codeGrant(code: string) {
    const result = await this.spotifyApi.authorizationCodeGrant(code);

    this.spotifyApi.setAccessToken(result.body["access_token"]);
    this.spotifyApi.setRefreshToken(result.body["refresh_token"]);
  }

  async createPlaylistWithSongs(playlistName: string, songs: string[]) {
    const user = await this.spotifyApi.getMe()
    const playlist = await this.spotifyApi.createPlaylist(user.body.id, playlistName, { public: true })

    await this.spotifyApi.addTracksToPlaylist(playlist.body.id, songs);

    return playlist;
  }
}
