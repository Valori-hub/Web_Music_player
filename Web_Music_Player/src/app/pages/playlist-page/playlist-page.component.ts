import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { HttpService } from '../../http-service.service';

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

export class PlaylistPageComponent{
  
}
