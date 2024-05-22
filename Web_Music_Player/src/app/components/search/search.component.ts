import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';
import { Iplaylist, Isongs } from '../playlist/model/Songs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 400;
  inputText: string = '';
  artistResults: any = null;
  songsResults: any = null;
  playlistsData: any;
  songsQueue: Isongs[] = [];
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
    this.getUsersPlaylists();
  }

  isLogedin() {
    return this.http.isLoggedIn();
  }
  addToQueue(songLink: Isongs) {
    if (
      !this.songsQueue.some((existingSong) => existingSong.id === songLink.id)
    ) {
      this.songsQueue.push(songLink);
      this.http.changeSong(this.songsQueue);
      console.log(this.songsQueue);
    } else {
      console.log('Song is already added to queue');
    }
  }
  selectSong(songLink: Isongs) {
    this.songsQueue.length = 0;
    this.songsQueue.push(songLink);
    console.log(this.songsQueue);
    this.http.changeSong(this.songsQueue);
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }
  onSearch(searchValue: string) {
    this.searchSubject.next(searchValue);
  }
  performSearch(searchValue: string) {
    if (searchValue !== '') {
      console.log('Performing search for:', searchValue);
      this.http.search(searchValue).subscribe((response: any) => {
        this.artistResults = response.searchResults.artistResults;
        this.songsResults = response.searchResults.songsResults;
        console.log(this.artistResults, this.songsResults);
      });
    } else {
      this.artistResults = null;
      this.songsResults = null;
    }
  }
  private async getUsersPlaylists() {
    if (this.http.isLoggedIn()) {
      this.http.getUsersPlaylistsData().subscribe((result) => {
        this.playlistsData = result.data.data;
      });
    }
    return;
  }
  addToPlaylist(playlist: any, song: any) {
    console.log(playlist, song);
  }
}
