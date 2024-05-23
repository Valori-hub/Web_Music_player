import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, CanActivate, RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpSentEvent } from '@angular/common/http';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CommonModule } from '@angular/common';
import { HttpService } from './http-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';

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
  publicRoutes = [
    '/home(authentication:login)',
    '/home(authentication:signup)',
  ];
  constructor(private router: Router, private authService: AuthGuard) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
    this.canActivate();
  }
  canActivate(): boolean {
    if (sessionStorage.getItem('username')) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  checkRoute(url: string): void {
    console.log(url);
    if (this.publicRoutes.includes(url)) {
      this.showGrid = false;
    } else {
      this.showGrid = true;
    }
  }
}
