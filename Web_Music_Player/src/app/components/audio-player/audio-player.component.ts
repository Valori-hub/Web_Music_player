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
import { Iplaylist, Isongs } from '../playlist/model/Songs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent {
  currentTime: number | undefined = 0;
  duration: number = 0;
  sliderValue: number = 1;
  currentSong: string = '';
  currentSongObject: Isongs[] = [];
  currentSongIndex: number = 0;

  private audio!: HTMLAudioElement;
  isPlaying: boolean = false;
  playlistsData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.addEventListener('timeupdate', () => {
        this.changeDetectorRef.detectChanges();
        this.currentTime = this.audio.currentTime;
        this.duration = this.audio.duration;
      });
      this.audio.onended = () => {
        this.skipSong();
      };
    }
  }
  ngOnInit() {
    this.InitComponent();
  }
  private async InitComponent() {
    this.http.song$.subscribe((playlist) => {
      const previousIndex = this.currentSongIndex;
      const previousSource = this.currentSong;
      this.currentSongObject = playlist;
      this.currentSong = this.currentSongObject[this.currentSongIndex].link;

      if (
        previousIndex !== this.currentSongIndex ||
        previousSource !== this.currentSong
      ) {
        this.audio.src = this.currentSong;
        this.audio.load();
        if (this.isPlaying) {
          this.audio.play();
        }
      }
    });

    this.getUsersPlaylists();
  }
  addToPlaylist(song: Isongs, playlist: Iplaylist) {
    let username = this.http.getUsername();
    this.http.addToPlaylist(username, song, playlist);
  }
  skipSong() {
    if (this.currentSongObject.length > this.currentSongIndex + 1) {
      this.currentSongIndex = this.currentSongIndex + 1;
      this.currentSong = this.currentSongObject[this.currentSongIndex].link;
      this.audio.src = this.currentSong;
      this.audio.load();
      if (this.isPlaying) {
        this.audio.play();
      }
    } else {
      console.log('there is nothing after :c');
    }
  }
  previousSong() {
    if (this.currentSongIndex >= 1) {
      this.currentSongIndex = this.currentSongIndex - 1;
      this.currentSong = this.currentSongObject[this.currentSongIndex].link;
      this.audio.src = this.currentSong;
      this.audio.load();
      if (this.isPlaying) {
        this.audio.play();
      }
    } else {
      console.log('there was nothing before :c');
    }
  }
  toggleMusic() {
    this.isPlaying = !this.isPlaying;
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
  private getUsersPlaylists() {
    if (this.http.isLoggedIn()) {
      this.http.getUsersPlaylistsData().subscribe((result) => {
        this.playlistsData = result.data.data;
      });
    }
    return;
  }
}
