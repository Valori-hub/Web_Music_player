import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';

@Injectable({
providedIn:  'root'
})


export class HttpService {
private url = 'http://localhost:3000/'
constructor(private http: HttpClient) { }


getSongsByGenre(){
  return this.http.get(this.url + 'songs/list-byGenre');
}
getGenreInfo(){
  return this.http.get(this.url + 'genreInfo/genre_info-list');
}
getPlayLists(){
  return this.http.get(this.url + 'playlists/playlists')
}
getPlayList(playlist_id: string){
  return this.http.get(this.url + `playlists/playlist?playlistId=${playlist_id}`)
}
createUser(user: any ){
  delete user.confirmPassword;
  return this.http.post<any>(this.url + 'users', {userObject: user});
  }
loginUser(user: any){
  return this.http.post<any>(this.url + 'users/login', {userObject: user});
}
isLoggedIn(): boolean {
  return !!sessionStorage.getItem('sessionId');
}
getUsername(): string| null{
  return sessionStorage.getItem('username');
}
logout(): void {
  sessionStorage.removeItem('sessionId');
  sessionStorage.removeItem('username');
}
search(searchInput: any){
  return this.http.post<any>(this.url + 'songs/search', {searchInput: searchInput});
}

}
