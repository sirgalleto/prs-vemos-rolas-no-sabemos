import { Track, getTrack } from "spotify-node-applescript";

async function getTrackPromise() {
  return new Promise((resolve, reject) => {
    getTrack((error: any, track: Track) => {
      if (error) {
        reject(error)
      } else {
        resolve(track)
      }
    });
  });
}

export default class Spotify {
  static async getCurrentTrackMetadata() {
    try {
      const track: any = await getTrackPromise();

      return Spotify.formatTrackData(track);
    } catch (error) {
      throw new Error(error);
    }
  }

  static formatTrackData(track: Track) {
    return [
      "MUSIC_SOURCE=spotify",
      `SPOTIFY_ID=${track.id}`,
      `TRACK_NAME=${track.name}`,
      `ARTIST_NAME=${track.album_artist}`,
      `SPOTIFY_URL=${track.spotify_url}`
    ].join("\n");
  }
}
