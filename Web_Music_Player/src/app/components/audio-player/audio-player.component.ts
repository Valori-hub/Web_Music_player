import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class AudioPlayerComponent{
  private audio!: HTMLAudioElement;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
    }
  }

  openSong() {
    this.audio.src = "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3";
    this.audio.load();
    this.audio.play();
    }
  pauseSong(){
    this.audio.pause();
  }
}
