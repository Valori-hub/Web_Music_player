import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TopNavbarComponent } from "../../components/top-navbar/top-navbar.component";
import { songs } from '../../../../song_data_base/songs_db';
import { iSongs } from '../../../../song_data_base/songs_db';
import { SongCardsComponent } from '../../components/song-cards/song-cards.component';
import { PlaylistComponent } from '../playlist/playlist.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatIconModule,
        TopNavbarComponent,
        SongCardsComponent,
        PlaylistComponent
    ]
})

export class HomeComponent implements iSongs {
    id = 0;
    title = '';
    artist = '';
    duration = '';
    cover = '';
    genre = '';
    link = ''

    constructor(){}
}
// const allSongs = {
//     songs: [...songs],
//     currentSong: null as iSongs | null,
//     songCurrentTime: 0,
// };
// const audio = new Audio();
// const playSong = (id: number) => {
//   const song = allSongs.songs.find((song) => song.id === id);
//   if (song) {
//     audio.src = song.link;
//     audio.title = song.title;
//     allSongs.currentSong = song;
//   }
// };

