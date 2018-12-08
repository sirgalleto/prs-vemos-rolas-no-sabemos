import { Command } from "@oclif/command";
import cli from "cli-ux";
import Git from "../lib/git";
import credentials from "../lib/credentials";
import SpotifyService from "../lib/spotifyService";

export default class CreatePlaylist extends Command {
  static description =
    "creates a playlist with the music between <start-commit> and <end-commit>";

  static examples = [
    `$ pvrns create-playlist 16c97ebcf6ce27bf23781e37515b6bd91a66fddf 724e9967c73ba42d0aab2fabd1a7c70590e62d5c`
  ];

  static flags = {};
  static args = [{ name: "start-commit" }, { name: "end-commit" }];

  async run() {
    const { args } = this.parse(CreatePlaylist);
    const playlistName: string = await cli.prompt("Playlist name");
    const startCommit: string = args["start-commit"];
    const endCommit: string = args["end-commit"];
    const spotifyCredentials = await credentials.get();
    const spotifyService = new SpotifyService(spotifyCredentials);

    await spotifyService.authorizeUserFlow()

    cli.action.start("Creating your playlist 🎵");

    const songs = await Git.getSongsBetweenTwoCommits(startCommit, endCommit);

    const songsIds = songs.map((song = "") => {
      return (song.split("\n").find(value => value.includes("SPOTIFY_ID")) || '').split("=")[1];
    });

    try {
      await spotifyService.createPlaylistWithSongs(playlistName, songsIds);
      cli.action.stop("Your playlist has been created 🎸");
      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
