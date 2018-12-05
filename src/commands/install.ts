import { Command } from "@oclif/command";
import { existsSync, copyFileSync, chmodSync } from "fs";
import cli from "cli-ux";

export default class Hello extends Command {
  static description =
    "install the post-commit hook that saves the music metadata";

  static examples = [`$ pvrns install`];

  static flags = {};
  static args = [];

  gitHooksDirectory: string = "./.git/hooks";
  postCommitTemplateRoute: string = `${__dirname}/../../hooks-templates/post-commit.template`;
  postCommitFileName: string = "post-commit";

  async run() {
    cli.action.start("Creating post-commit hook");
    await cli.wait(1000);
    const isGitRepository = existsSync(this.gitHooksDirectory);

    if (isGitRepository) {
      const postCommitRoute = `${this.gitHooksDirectory}/${
        this.postCommitFileName
      }`;

      copyFileSync(this.postCommitTemplateRoute, postCommitRoute);
      chmodSync(postCommitRoute, "755");

      cli.action.stop("pvrns has been installed correctly");
    } else {
      cli.action.stop("ERROR: A hook must be installed in a git root");
    }
  }
}
