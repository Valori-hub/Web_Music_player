import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TopNavbarComponent } from "../../components/top-navbar/top-navbar.component";
import { songs } from '../../../../song_data_base/songs_db';
import { iSongs } from '../../../../song_data_base/songs_db';
import { SongCardsComponent } from '../../components/song-cards/song-cards.component';
import { PlaylistComponent } from '../../components/playlist/playlist.component';


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

export class HomeComponent  {
}