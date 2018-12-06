import { Repository, Note } from "nodegit";

export default class Git {
  static async createNoteForLastCommit(note: string) {
    try {
      const repository = await Repository.open("./");
      const currentBranch = await repository.getCurrentBranch();
      const commit = await repository.getBranchCommit(currentBranch.name());
      const author = commit.author();
      const oid = commit.id();
      const trackMessage = note

      await Note.create(
        repository,
        "refs/notes/commits",
        author,
        author,
        oid,
        trackMessage,
        1
      );
    } catch (error) {
      console.error("There was an error adding the music note:", error);
      throw new Error(error)
    }
  }
}
