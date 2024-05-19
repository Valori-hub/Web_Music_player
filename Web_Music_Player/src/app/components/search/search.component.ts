import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';
import { Isongs } from '../playlist/model/Songs';
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

  constructor(private httpClient: HttpService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }
  isLogedin() {
    return this.httpClient.isLoggedIn();
  }
  selectSong(songLink: Isongs) {
    this.httpClient.changeSong(songLink);
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
      this.httpClient.search(searchValue).subscribe((response: any) => {
        this.artistResults = response.searchResults.artistResults;
        this.songsResults = response.searchResults.songsResults;
        console.log(this.artistResults, this.songsResults);
      });
    } else {
      this.artistResults = null;
      this.songsResults = null;
    }
  }
}
