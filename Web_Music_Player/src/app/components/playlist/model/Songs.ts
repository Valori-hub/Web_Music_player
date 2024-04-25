export interface Isongs {
  id: number,
  title:string,
  artist: string,
  duration: string,
  cover: string,
  genre: string,
  link:string,
}
export interface Iplaylist {
  id: number,
  title: string,
  cover?: string,
  description?: string
  songs: Isongs[] 
}