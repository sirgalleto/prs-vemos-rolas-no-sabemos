import { Repository, Note, Oid, Commit } from "nodegit";

const notesRef = "refs/notes/commits";

export default class Git {
  static async createNoteForLastCommit(note: string) {
    try {
      const repository = await Repository.open("./");
      const currentBranch = await repository.getCurrentBranch();
      const commit = await repository.getBranchCommit(currentBranch.name());
      const author = commit.author();
      const oid = commit.id();
      const trackMessage = note;

      await Note.create(
        repository,
        notesRef,
        author,
        author,
        oid,
        trackMessage,
        1
      );
    } catch (error) {
      console.error("There was an error adding the music note:", error);
      throw new Error(error);
    }
  }

  static async getCommitsBetweenTwoCommits(
    startCommit: string,
    endCommit: string
  ) {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const repository = await Repository.open("./");

        const startCommitOid = Oid.fromString(startCommit);
        const startCommitObject = await Commit.lookup(
          repository,
          startCommitOid
        );

        const eventEmitter = startCommitObject.history();

        eventEmitter.on("end", function(commits) {
          const filteredCommits = [startCommitObject];
          let index = 0;

          while (commits[index].id().tostrS() !== endCommit) {
            filteredCommits.push(commits[index]);
            index++;
          }

          resolve(filteredCommits);
        });

        eventEmitter.start();
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getSongsBetweenTwoCommits(
    startCommit: string,
    endCommit: string
  ) {
    const repository = await Repository.open("./");
    const commits: any[] = await Git.getCommitsBetweenTwoCommits(
      startCommit,
      endCommit
    );

    const notes = await Promise.all(
      commits.map(commit => {
        // Bypass any error and send an empty string
        return new Promise(async (resolve) => {
          try {
            const note = await Note.read(repository, notesRef, commit.id());
            resolve(note)
          } catch(error) {
            resolve('')
          }
        });
      })
    );

    return notes.filter(note => Boolean(note)).map((note:any) => note && note.message());
  }
}
