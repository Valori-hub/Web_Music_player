import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    PlaylistComponent,
    SideBarComponent,
    TopNavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Web_Music_Player';
}
