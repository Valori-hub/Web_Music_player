import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { RouterModule } from '@angular/router';
import { PlaylistLocalService } from '../../pages/playlist-page/service/playlist-service';
import { Iplaylist } from './model/Songs';



@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent implements OnInit {
  playlistsData: Iplaylist[] = [];

  constructor(private httpClient: HttpService, public playlistService: PlaylistLocalService) {}


  private async getPlaylistData() {
    this.httpClient.getPlayLists().subscribe(result => {
      this.playlistsData = result as Iplaylist[];
    });
  }

  ngOnInit(): void {
    this.InitComponent();
  }

  private async InitComponent() {
    await this.getPlaylistData();
  }

  sendPlaylistID(id: number) {
    this.playlistService.receivedValue = id;
  }
}
