import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { Router, RouterModule } from '@angular/router';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-user-playlist',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './user-playlist.component.html',
  styleUrl: './user-playlist.component.scss',
})
export class UserPlaylistComponent implements OnInit {
  playlistsData: any;
  username = this.auth.username;
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private auth: authService
  ) {}

  private async getUsersPlaylists() {
    if (this.auth.isLoggedIn()) {
      this.httpClient
        .getUsersPlaylistsData(this.username)
        .subscribe((result) => {
          if (result !== undefined) {
            this.playlistsData = result.data.data;
          }
        });
    }
    return;
  }
  ngOnInit(): void {
    this.InitComponent();
  }
  navigatePlaylistPage(playlistId: string) {
    this.router.navigateByUrl(`/playlist?id=${playlistId}`);
  }
  private async InitComponent() {
    await this.getUsersPlaylists();
  }
}
