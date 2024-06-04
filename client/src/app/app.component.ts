import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CommonModule } from '@angular/common';
import { HttpService } from './http-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { authService } from './auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PlaylistPageComponent,
    RouterOutlet,
    HttpClientModule,
    PlaylistComponent,
    SideBarComponent,
    TopNavbarComponent,
    AudioPlayerComponent,
    SignupComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Web_Music_Player';
  showGrid: boolean = true;
  private authenticationRegex: RegExp = /\(authentication:.*?\)/;

  constructor(
    private router: Router,
    private httpClient: HttpService,
    private auth: authService
  ) {}

  ngOnInit(): void {
    this.auth.getSessionData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
    this.canActivate();
  }
  //If the user is logged in, there is no
  //possibility of navigating between pages using the URL.
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  // Disabling the grid when navigating to the login or signup route
  //  includes every other variation that may crash the layout.
  checkRoute(url: string): void {
    if (this.authenticationRegex.test(url)) {
      this.showGrid = false;
    } else {
      this.showGrid = true;
    }
  }
}
