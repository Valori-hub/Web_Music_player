import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { Iplaylist, Isongs } from '../../components/playlist/model/Songs';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { songs } from '../../../assets/song_data_base/songs_db';

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
  songsQueue: Isongs[] = [];
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  private async getPlaylistData() {
    this.http.getPlayList(this.playlist_id).subscribe((result) => {
      if (result != null) {
        this.playlistData = result as Iplaylist;
        console.log('playlistData after getPlaylistData:', this.playlistData);
      } else {
        console.log('empty result');
      }
    });
  }
  private async getPlaylistUserData() {
    this.http.getUserPlayList(this.playlist_id).subscribe((result) => {
      if (result != null) {
        this.playlistData = result as Iplaylist;
        console.log('playlistData after getPlaylistData:', this.playlistData);
      } else {
        console.log('empty result');
      }
    });
  }

  ngOnInit(): void {
    this.InitComponent();
  }

  private InitComponent() {
    this.route.queryParams.subscribe((params) => {
      if (params['id'] !== undefined && params['id'] !== null) {
        this.playlist_id = params['id'];
      } else {
        this.router.navigateByUrl('');
      }
      this.getPlaylistUserData();
      this.getPlaylistData();
      console.log(this.getPlaylistData);
    });
  }

  playAll(songs: Isongs[]) {
    this.songsQueue.length = 0;
    songs.forEach((song) => {
      if (
        !this.songsQueue.some((existingSong) => existingSong.id === song.id)
      ) {
        this.songsQueue.push(song);
      } else {
        console.log('Song is already added to queue');
      }
    });
    this.http.changeSong(this.songsQueue);
    console.log('songsQueue:', this.songsQueue);
  }
  selectSong(songLink: Isongs) {
    this.songsQueue.length = 0;
    this.songsQueue.push(songLink);
    console.log(this.songsQueue);
    this.http.changeSong(this.songsQueue);
  }
}
