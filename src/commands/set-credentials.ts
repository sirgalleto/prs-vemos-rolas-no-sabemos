import { Command } from "@oclif/command";
import cli from "cli-ux";
import Client from '../lib/credentials'

export default class SetCredentials extends Command {
  static description =
    "adds spotify application credentials";

  static examples = [`$ pvrns login`];

  static flags = {};
  static args = [];

  async run() {
    try {
      const clientId: string = await cli.prompt('clientId')
      const clientSecret: string = await cli.prompt('clientSecret')

      Client.set({ clientId, clientSecret })
    } catch(error) {
		  console.error("​It was an error saving your credentials")
    }
  }
}
