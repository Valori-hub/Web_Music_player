import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { IGenreInfo } from './model/GenreInfo';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { RouterModule } from '@angular/router';
import { IsongsByGenre } from './model/Songs';

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

export class PlaylistComponent implements OnInit{
  genreInfoData: IGenreInfo[] = [];
  sortedByGenre: IsongsByGenre[] = [];
  constructor(private httpClient: HttpService){}
  private async SongsByGenreList(){
    this.httpClient.getSongsByGenre().subscribe(result => {
      this.sortedByGenre = result as IsongsByGenre[];
      console.log(this.sortedByGenre);
    })
  }
  private async GenreInfo() {
    this.httpClient.getGenreInfo().subscribe(result => {
      this.genreInfoData = result as IGenreInfo[];
    })
  }
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent(){
    await this.GenreInfo();
    await this.SongsByGenreList();
  }
  
}
