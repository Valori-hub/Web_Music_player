import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Iplaylist, Isongs } from './components/playlist/model/Songs';
import { IcreatorPlaylist } from './components/playlist-creator/model/creatorInterfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://localhost:3000/';
  private songSource = new Subject<Isongs[]>();
  song$ = this.songSource.asObservable();

  constructor(private http: HttpClient) {}
  //Sending new audio src to the audio-player component
  changeSong(songUrl: Isongs[]) {
    this.songSource.next(songUrl);
  }
  //Posting new user data to the server.
  createUser(user: any) {
    delete user.confirmPassword;
    return this.http.post<any>(this.url + 'users', { userObject: user });
  }
  loginUser(user: any) {
    return this.http.post<any>(this.url + 'users/login', { userObject: user });
  }
  //Verifying if the user is logged in.
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('sessionId');
  }
  //Getting current logged in username from the session storage
  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }
  //Remove all from the session storage
  logout(): void {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('username');
  }
  search(searchInput: any) {
    return this.http.post<any>(this.url + 'songs/search', {
      searchInput: searchInput,
    });
  }
  // Sending the created playlist data to the currently logged-in user.
  createPlaylist(playlistData: IcreatorPlaylist) {
    const userId = sessionStorage.getItem('username');
    return this.http.post<any>(this.url + 'playlists/create-playlist', {
      playlist: playlistData,
      userId: userId,
    });
  }
  // Getting global playlists and displaying it as a card on the home page.
  getPlayLists() {
    return this.http.get(this.url + 'playlists/playlists');
  }
  // Getting all user playlists and displaying it as a card on the home page.
  getUsersPlaylistsData() {
    const userId = sessionStorage.getItem('username');
    return this.http.post<any>(this.url + 'playlists/user-playlists', {
      userId: userId,
    });
  }
  // Getting global playlist data and displaying it on the playlist page.
  getPlayList(playlist_id: string) {
    return this.http.get(
      this.url + `playlists/playlist?playlistId=${playlist_id}`
    );
  }
  // Getting user playlist data and displaying it on the playlist page.
  getUserPlayList(playlist_id: string) {
    const userId = sessionStorage.getItem('username');
    return this.http.get(
      this.url +
        `playlists/playlist-user?userId=${userId}&playlistId=${playlist_id}`
    );
  }
  addToPlaylist(username: string | null, song: Isongs, playlist: Iplaylist) {
    console.log(username, song, playlist);
    return this.http.post<any>(this.url + 'playlists/user-playlists-add', {
      name: username,
      song_id: song,
    });
  }
}
