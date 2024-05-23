import { ObjectId } from 'mongodb';

export interface IcreatorSongs {
  title: string;
  artist: string;
  duration: string;
  cover: string;
  genre: string;
  link: string;
}
export interface IcreatorPlaylist {
  _id: ObjectId;
  title: string;
  cover?: string;
  description?: string;
  songs?: IcreatorSongs[];
}
export interface Iplaylist {
  _id: ObjectId;
  title: string;
  description: string;
  cover: string;
  songs?: Isong[];
}

export interface Isong {
  _id?: number;
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  genre: string;
  link: string;
}

interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  playlists: Iplaylist[];
}
