import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatSliderModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent{
  sliderValue: number = 0
  private audio!: HTMLAudioElement;
  isPlaying: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private changeDetectorRef: ChangeDetectorRef) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
    }
  }
  toggleMusic() {
    this.isPlaying = !this.isPlaying;
    this.changeDetectorRef.detectChanges();
    if (this.isPlaying) {
      this.audio.src = "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3";
      this.audio.load();
      this.audio.play();
      console.log(this.audio.currentTime);
      }else{
        this.audio.pause();
      }
    }
    changeVolume(event: any) {
      const volume: any = event.value;
      console.log(parseFloat(volume));
    }

  }
  
