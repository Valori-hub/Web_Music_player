export interface Isongs {
  id: number,
  title:string,
  artist: string,
  duration: string,
  cover: string,
  genre: string,
  link:string,
}
export interface IsongsByGenre {
  _id: string,
  songs: [Isongs]
}