import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { Iplaylist, Isongs } from '../../components/playlist/model/Songs';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-playlist-page',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './playlist-page.component.html',
  styleUrl: './playlist-page.component.scss',
})
export class PlaylistPageComponent implements OnInit {
  playlistData: Iplaylist;
  playlist_id: string = '';
  username = this.auth.username;
  songsQueue: Isongs[] = [];
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: authService
  ) {}

  private async getPlaylistData() {
    this.http.getPlayList(this.playlist_id).subscribe((result) => {
      if (result) {
        this.playlistData = result as Iplaylist;
      } else {
        return;
      }
    });
  }
  private async getPlaylistUserData() {
    this.http
      .getUserPlayList(this.playlist_id, this.username)
      .subscribe((result) => {
        if (result) {
          this.playlistData = result as Iplaylist;
        } else {
          return;
        }
      });
  }

  ngOnInit(): void {
    this.InitComponent();
  }

  private InitComponent() {
    //Getting the chosen playlist ID from query parameters in the URL and assigning it to the playlist_id.
    this.route.queryParams.subscribe((params) => {
      if (params['id'] !== undefined && params['id'] !== null) {
        this.playlist_id = params['id'];
      } else {
        this.router.navigateByUrl('');
      }
      this.getPlaylistUserData();
      this.getPlaylistData();
    });
  }
  //Resetting current queue and adding the whole playlist
  playAll(songs: Isongs[]) {
    this.songsQueue.length = 0;
    songs.forEach((song) => {
      if (
        !this.songsQueue.some((existingSong) => existingSong.id === song.id)
      ) {
        this.songsQueue.push(song);
      }
    });
    this.http.changeSong(this.songsQueue);
  }
  //Resetting current queue and adding chosen song
  selectSong(songLink: Isongs) {
    this.songsQueue.length = 0;
    this.songsQueue.push(songLink);
    this.http.changeSong(this.songsQueue);
  }
}
