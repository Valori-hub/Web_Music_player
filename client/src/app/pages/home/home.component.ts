import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TopNavbarComponent } from '../../components/top-navbar/top-navbar.component';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { PlaylistPageComponent } from '../playlist-page/playlist-page.component';
import { UserPlaylistComponent } from '../../components/user-playlist/user-playlist.component';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';
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
    PlaylistComponent,
    PlaylistPageComponent,
    UserPlaylistComponent,
    CommonModule,
  ],
})
export class HomeComponent {
  constructor(private httpClient: HttpService) {}
  isLoggedIn() {
    return this.httpClient.isLoggedIn();
  }
}
