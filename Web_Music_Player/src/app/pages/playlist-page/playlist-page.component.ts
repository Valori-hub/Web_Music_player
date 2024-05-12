import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http-service.service';
import { Iplaylist } from '../../components/playlist/model/Songs';
import {MatListModule} from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-playlist-page',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './playlist-page.component.html',
  styleUrl: './playlist-page.component.scss'
})

export class PlaylistPageComponent implements OnInit {
  value: any = undefined;
  playlistData: Iplaylist;
  playlist_id: string = ''
  constructor(private httpClient: HttpService, private route: ActivatedRoute, private router: Router) { }
  private async getPlaylistData() {
    this.httpClient.getPlayList(this.playlist_id).subscribe(result => {
      this.playlistData = result as Iplaylist;
      console.log
    });
  }

  ngOnInit(): void {
    this.InitComponent();  
  }
  
  private async InitComponent() {
    this.route.queryParams.forEach(p => {
      if(p['id'] != undefined && p['id'] != null){
        this.playlist_id = p['id'];
      }
      else{
        this.router.navigateByUrl('')
      }
    })
    this.getPlaylistData();
  }

}

