import {
  Component,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpService } from '../../http-service.service';
import { Isongs } from '../playlist/model/Songs';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatSliderModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent {
  currentTime: number = 0;
  duration: number = 0;
  sliderValue: number = 1;
  currentSong: string = '';
  currentSongObject: Isongs;

  private audio!: HTMLAudioElement;
  isPlaying: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio.currentTime;
        this.duration = this.audio.duration;
      });
    }
  }
  ngOnInit() {
    this.http.song$.subscribe((songUrl) => {
      this.currentSongObject = songUrl;
      this.currentSong = songUrl.link;
      this.audio.src = this.currentSong;
      console.log(this.audio.src);
      this.audio.load();
      if (this.isPlaying) {
        this.audio.play();
      }
    });
  }
  toggleMusic() {
    this.isPlaying = !this.isPlaying;
    this.changeDetectorRef.detectChanges();
    if (this.isPlaying) {
      if (this.audio.currentTime === 0) {
        this.audio.src = this.currentSong;
        this.audio.load();
      }
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  changeVolume(event: any) {
    this.audio.volume = event;
  }
  calculateProgress(): number {
    return (this.audio.currentTime / this.audio.duration) * 100;
  }
}
