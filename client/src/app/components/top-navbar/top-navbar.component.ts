import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';
import { authService } from '../../auth-service.service';
import { Isongs } from '../playlist/model/Songs';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss',
})
export class TopNavbarComponent implements OnInit {
  username: string | null;
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private auth: authService
  ) {}
  getUsername() {
    return this.auth.getUsername();
  }
  ngOnInit(): void {}

  authNavigate(string: string) {
    this.router.navigateByUrl(`(authentication:${string})`);
  }
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  //Clearing user session storage and reloading the page
  async logout() {
    this.httpClient.logout().subscribe((result) => {
      result;
    });
    await this.router.navigate(['']);
    window.location.reload();
  }
}
