import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { songs } from '../../../../song_data_base/songs_db';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent {
  songs = songs;
  propertyValues = songs.map(obj => obj['genre']);
  uniqueValuesSet = new Set(this.propertyValues);  
  distinctValues = Array.from(this.uniqueValuesSet);
}
