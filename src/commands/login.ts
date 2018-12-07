import { Command } from "@oclif/command";
import * as express from "express";
import { existsSync, copyFileSync, chmodSync } from "fs";
import cli from "cli-ux";

export default class Hello extends Command {
  static description =
    "adds spotify application credential and starts the token generation flow";

  static examples = [`$ pvrns login`];

  static flags = {};
  static args = [];

  async run() {
    const app = express();
    const port = 9090;

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  }
}
