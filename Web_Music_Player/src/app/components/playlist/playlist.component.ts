import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { songs, GenreCover } from '../../../../song_data_base/songs_db';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent {

  GenreCover = GenreCover;
  songs = songs;
  genreList = songs.map(item => item['genre']);
  uniqueValuesSet = new Set(this.genreList);  
  distinctValues = Array.from(this.uniqueValuesSet);
  genreCoverUrl(genre: string): GenreInfo {
    return genreCoverMap[genre];
  }
  
}
interface GenreInfo {
  cover: string;
  description: string;
}
const genreCoverMap: { [key: string]: GenreInfo } = {};
GenreCover.forEach(item => {
  genreCoverMap[item.genre] = { cover: item.cover, description: item.description };
});
