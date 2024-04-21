import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { songs, GenreCover } from '../../../../song_data_base/songs_db';
import {MatCardModule} from '@angular/material/card';
import { IGenreInfo } from './model/GenreInfo';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent implements OnInit{
  songsByGenre: any = undefined;
  constructor(private httpClient: HttpService){}
  
  private async loadSongsByGenre() {
    this.httpClient.getSongsByGenre().subscribe(result => {
      console.log(result);
      this.songsByGenre = result;
    })
  }
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent(){
    await this.loadSongsByGenre();
    
  }
}
