import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { IGenreInfo } from './model/GenreInfo';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { Router, RouterModule } from '@angular/router';
import { Iplaylist } from './model/Songs';



@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent implements OnInit {
  playlistsData: Iplaylist[] = [];

  constructor(private httpClient: HttpService, private router: Router) {}


  private async getPlaylistData() {
    this.httpClient.getPlayLists().subscribe(result => {
      this.playlistsData = result as Iplaylist[];
    });
  }

  navigatePlaylistPage(playlistId: string){
    this.router.navigateByUrl(`/playlist?id=${playlistId}`)
  }
  ngOnInit(): void {
    this.InitComponent();
  }

  private async InitComponent() {
    await this.getPlaylistData();
  }
}
