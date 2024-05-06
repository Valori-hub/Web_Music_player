import { Component } from '@angular/core';
import { songs } from '../../../assets/song_data_base/songs_db';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-song-cards',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './song-cards.component.html',
  styleUrl: './song-cards.component.scss'
})
export class SongCardsComponent {
  Allsongs = songs;
}
