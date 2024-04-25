import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { HttpService } from '../../http-service.service';
import { Iplaylist } from '../../components/playlist/model/Songs';
import { PlaylistLocalService } from './service/playlist-service';

@Component({
  selector: 'app-playlist-page',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    PlaylistComponent
  ],
  templateUrl: './playlist-page.component.html',
  styleUrl: './playlist-page.component.scss'
})

export class PlaylistPageComponent implements OnInit {
  value: any = undefined;
  playlistData: Iplaylist[] = [];

  constructor(private httpClient: HttpService, public playlistService: PlaylistLocalService) { }
  private async getPlaylistData() {
    this.httpClient.getPlayLists().subscribe(result => {
      this.playlistData = result as Iplaylist[];
    });
  }

  ngOnInit(): void {
    this.InitComponent();  
  }
  
  private async InitComponent() {
    this.getValueFromPlayListService();
    this.getPlaylistData();
  }

  getValueFromPlayListService() {
    this.value = this.playlistService.receivedValue;
  }

}

