import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TopNavbarComponent } from "../../components/top-navbar/top-navbar.component";
import { SongCardsComponent } from '../../components/song-cards/song-cards.component';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { PlaylistPageComponent } from '../playlist-page/playlist-page.component';
// import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';
// import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatIconModule,
        TopNavbarComponent, 
        SongCardsComponent,
        PlaylistComponent,
        PlaylistPageComponent
        // AudioPlayerComponent,
        
        // SideBarComponent
    ]
})

export class HomeComponent  {
}