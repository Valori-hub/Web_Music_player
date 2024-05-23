export interface IcreatorSongs {
  title: string;
  artist: string;
  duration: string;
  cover: string;
  genre: string;
  link: string;
}
export interface IcreatorPlaylist {
  title: string;
  cover?: string;
  description?: string;
  songs: IcreatorSongs[];
}
