declare module "spotify-node-applescript" {
  export interface Track {
    artist: string;
    album: string;
    disc_number: number;
    duration: number;
    played_count: number;
    track_number: number;
    starred: boolean;
    popularity: number;
    id: string;
    name: string;
    album_artist: string;
    artwork_url: string;
    spotify_url: string;
  }

  export function getTrack(callback: (error:any, data: Track) => void): void;
}
