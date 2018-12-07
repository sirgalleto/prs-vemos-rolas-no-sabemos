import { Command } from "@oclif/command";
import * as SpotifyWebApi from "spotify-web-api-node";
import * as express from "express";
import cli from "cli-ux";

export default class Hello extends Command {
  static description =
    "adds spotify application credential and starts the token generation flow";

  static examples = [`$ pvrns login`];

  static flags = {};
  static args = [];
  port = 9090;
  credentials = {
    clientId: "test",
    clientSecret: "test",
    redirectUri: "http://localhost:9090"
  };

  async getAccessToken() {
    const scopes = ["user-read-private", "user-read-email"];

    const spotifyWebApi = new SpotifyWebApi(this.credentials);
    const authorizeUrl: string = spotifyWebApi.createAuthorizeURL(
      scopes,
      "login"
    );

    await cli.open(authorizeUrl);

    return new Promise((resolve, reject) => {
      let server: any;
      const app = express();

      app.get("/", ({ query: { code } }, res) => {
        resolve(code);
        server.close();
        res.send("You can come back to the cli now!!");
      });

      server = app.listen(this.port);
    });
  }

  async run() {
    cli.action.start("Redirecting you to spotify");
    const code = await this.getAccessToken();
    cli.action.stop("Spotify token saved correctly");
    console.log("​run -> code", code);
  }
}
