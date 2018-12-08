import { Command } from "@oclif/command";
import Git from "../lib/git";

export default class CreatePlaylist extends Command {
  static description =
    "creates a playlist with the music between <start-commit> and <end-commit>";

  static examples = [
    `$ pvrns create-playlist 16c97ebcf6ce27bf23781e37515b6bd91a66fddf 724e9967c73ba42d0aab2fabd1a7c70590e62d5c`
  ];

  static flags = {};
  static args = [{ name: "start-commit" }, { name: "end-commit" }];

  gitHooksDirectory: string = "./.git/hooks";
  postCommitTemplateRoute: string = `${__dirname}/../../hooks-templates/post-commit.template`;
  postCommitFileName: string = "post-commit";

  async run() {
    const { args } = this.parse(CreatePlaylist);
    const startCommit = args["start-commit"];
    const endCommit = args["end-commit"];

    const songs = await Git.getSongsBetweenTwoCommits(startCommit, endCommit);

    console.log(songs)
  }
}
