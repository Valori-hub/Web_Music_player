import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SongCardsComponent } from '../song-cards/song-cards.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatIconModule,
    SongCardsComponent,
    RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
