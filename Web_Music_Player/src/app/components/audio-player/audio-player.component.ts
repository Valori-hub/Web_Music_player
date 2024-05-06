import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatSliderModule,
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {

}
