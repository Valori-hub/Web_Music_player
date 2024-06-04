import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Iplaylist, Isongs } from './components/playlist/model/Songs';
import { IcreatorPlaylist } from './components/playlist-creator/model/creatorInterfaces';
import { Observable } from 'rxjs';

interface SessionInfo {
  username: string | null;
  userId: string | null;
}
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
    this.songSource?.next(songUrl);
  }
  //Posting new user data to the server.
  createUser(user: any) {
    delete user.confirmPassword;
    return this.http.post<any>(this.url + 'users/register', {
      userObject: user,
    });
  }
  loginUser(user: any) {
    return this.http.post<any>(
      this.url + 'users/login',
      { userObject: user },
      { withCredentials: true }
    );
  }
  //Remove all from the session storage
  logout() {
    return this.http.post(
      this.url + 'users/logout',
      {},
      { withCredentials: true }
    );
  }
  getSessionData(): Observable<SessionInfo> {
    return this.http.get<SessionInfo>(this.url + 'users/session-info', {
      withCredentials: true,
    });
  }
  search(searchInput: any) {
    return this.http.post<any>(this.url + 'songs/search', {
      searchInput: searchInput,
    });
  }
  // Sending the created playlist data to the currently logged-in user.
  createPlaylist(playlistData: IcreatorPlaylist, username: string | null) {
    return this.http.post<any>(this.url + 'playlists/create-playlist', {
      playlist: playlistData,
      userId: username,
    });
  }
  // Getting global playlists and displaying it as a card on the home page.
  getPlayLists() {
    return this.http.get(this.url + 'playlists/playlists');
  }
  // Getting all user playlists and displaying it as a card on the home page.
  getUsersPlaylistsData(username: string | null) {
    return this.http.post<any>(this.url + 'playlists/user-playlists', {
      username: username,
    });
  }
  // Getting global playlist data and displaying it on the playlist page.
  getPlayList(playlist_id: string) {
    return this.http.get(
      this.url + `playlists/playlist?playlistId=${playlist_id}`
    );
  }
  // Getting user playlist data and displaying it on the playlist page.
  getUserPlayList(playlist_id: string, username: string | null) {
    return this.http.get(
      this.url +
        `playlists/playlist-user?username=${username}&playlistId=${playlist_id}`
    );
  }
  //Adding song to choosen user playlist
  addToPlaylist(username: string | null, song: Isongs, playlist: Iplaylist) {
    return this.http.post(this.url + 'playlists/add', {
      username: username,
      song: song,
      playlist: playlist,
    });
  }
}
