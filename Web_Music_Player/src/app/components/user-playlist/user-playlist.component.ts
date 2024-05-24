import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-playlist',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './user-playlist.component.html',
  styleUrl: './user-playlist.component.scss',
})
export class UserPlaylistComponent implements OnInit {
  playlistsData: any;
  constructor(private httpClient: HttpService, private router: Router) {}

  private async getUsersPlaylists() {
    if (this.httpClient.isLoggedIn()) {
      this.httpClient.getUsersPlaylistsData().subscribe((result) => {
        this.playlistsData = result.data.data;
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
