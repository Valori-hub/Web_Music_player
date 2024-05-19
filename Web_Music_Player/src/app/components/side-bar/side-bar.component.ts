import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SongCardsComponent } from '../song-cards/song-cards.component';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, SongCardsComponent, RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  constructor(public httpClient: HttpService, private router: Router) {}
}
