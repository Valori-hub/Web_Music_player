import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { CreatorDialogComponent } from './creator-dialog/creator-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpService } from '../../http-service.service';
import { Isongs } from '../playlist/model/Songs';
import { debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IcreatorPlaylist, IcreatorSongs } from './model/creatorInterfaces';
import { Route, Router } from '@angular/router';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-playlist-creator',
  standalone: true,
  templateUrl: './playlist-creator.component.html',
  styleUrl: './playlist-creator.component.scss',
  imports: [
    SearchComponent,
    CreatorDialogComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PlaylistCreatorComponent {
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 400;
  username: string | null = this.auth.username;
  inputText: string = '';
  artistResults: any = null;
  songsResults: any = null;
  playlist: IcreatorPlaylist = {
    title: 'Default Name',
    description: 'Default Description',
    cover:
      'https://cdn.pixabay.com/photo/2018/04/11/19/48/music-3311599_1280.png',
    songs: [],
  };
  constructor(
    public dialog: MatDialog,
    private httpClient: HttpService,
    private router: Router,
    private auth: authService
  ) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
    this.isLoggedin();
  }
  isLoggedin() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
  onSearch(searchValue: string) {
    this.searchSubject.next(searchValue);
  }
  performSearch(searchValue: string) {
    if (searchValue !== '') {
      this.httpClient.search(searchValue).subscribe((response: any) => {
        this.artistResults = response.searchResults.artistResults;
        this.songsResults = response.searchResults.songsResults;
      });
    } else {
      this.artistResults = null;
      this.songsResults = null;
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreatorDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.imageUrl === '') {
          this.playlist = {
            title: result.playlistName,
            description: result.playlistDescription,
            cover:
              'https://cdn.pixabay.com/photo/2018/04/11/19/48/music-3311599_1280.png',
            songs: [],
          };
        } else {
          this.playlist = {
            title: result.playlistName,
            description: result.playlistDescription,
            cover: result.imageUrl,
            songs: [],
          };
        }
      }
    });
  }
  removeSong(selectedSong: IcreatorSongs) {
    if (this.playlist.songs) {
      this.playlist.songs = this.playlist.songs.filter(
        (song) =>
          song.title !== selectedSong.title ||
          song.artist !== selectedSong.artist
      );
    }
  }
  addSong(selectedSong: Isongs) {
    if (!this.playlist.songs) {
      this.playlist.songs = [];
    }
    const songExists = this.playlist.songs.some(
      (song) =>
        song.title === selectedSong.title && song.artist === selectedSong.artist
    );
    if (!songExists) {
      this.playlist.songs.push(selectedSong);
    }
  }
  sendToServer() {
    this.httpClient.createPlaylist(this.playlist, this.username).subscribe(
      (result: {
        data: {
          success: true;
          message: string;
        };
      }) => {
        if (result.data.success) {
          this.router.navigate(['/home']);
        }
      }
    );
  }
}
