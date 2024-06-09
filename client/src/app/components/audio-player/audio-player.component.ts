import {
  Component,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpService } from '../../http-service.service';
import { Iplaylist, Isongs } from '../playlist/model/Songs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { authService } from '../../auth-service.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatSliderModule,
    CommonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  username: string | null;
  currentTime: number | undefined = 0;
  duration: number = 0;
  sliderValue: number = 1;
  currentSong: string = '';
  currentSongObject: Isongs[] = [];
  currentSongIndex: number = 0;
  playlistsData: any;
  private audio!: HTMLAudioElement;
  isPlaying: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef,
    private httpClient: HttpService,
    private auth: authService
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
  getUsername() {
    return this.auth.getUsername();
  }
  private async getUsersPlaylists() {
    await this.auth.getSessionData();
    this.username = this.getUsername();
    if (this.auth.isLoggedIn()) {
      this.httpClient
        .getUsersPlaylistsData(this.username)
        .subscribe((result) => {
          if (result !== undefined) {
            this.playlistsData = result.data.data;
          }
        });
    }
    return;
  }
  private subscriptions: Subscription = new Subscription();
  ngOnDestroy() {
    if (this.audio) {
      this.currentSongObject.length = 0;
      this.audio.pause();
      this.audio.onended = null;
    }
    this.subscriptions.unsubscribe();
  }
  ngOnInit() {
    this.InitComponent();
  }
  private async InitComponent() {
    await this.getUsersPlaylists();
    this.subscriptions.add(
      this.httpClient.song$.subscribe((playlist) => {
        this.currentSongIndex = 0;
        const previousIndex = this.currentSongIndex;
        const previousSource = this.currentSong;
        this.currentSongObject = playlist;
        this.currentSong = this.currentSongObject[this.currentSongIndex].link;
        if (
          previousIndex !== this.currentSongIndex ||
          previousSource !== this.currentSong
        ) {
          this.audio.pause();
          this.audio.src = this.currentSong;
          this.audio.load();
          this.audio.play();
          this.isPlaying = true;
        }
      })
    );
  }
  isLoggedin(): boolean {
    return this.auth.isLoggedIn();
  }
  addToPlaylist(playlist: Iplaylist, song: Isongs) {
    let username = this.auth.getUsername();
    this.httpClient.addToPlaylist(username, song, playlist);
  }
  skipSong() {
    if (this.currentSongObject.length > this.currentSongIndex + 1) {
      this.audio.pause();
      this.currentSongIndex = this.currentSongIndex + 1;
      this.currentSong = this.currentSongObject[this.currentSongIndex].link;
      this.audio.src = this.currentSong;
      this.audio.load();
      if (this.isPlaying) {
        this.audio.play();
      }
    }
  }
  previousSong() {
    if (this.currentSongIndex >= 1) {
      this.audio.pause();
      this.currentSongIndex = this.currentSongIndex - 1;
      this.currentSong = this.currentSongObject[this.currentSongIndex].link;
      this.audio.src = this.currentSong;
      this.audio.load();
      if (this.isPlaying) {
        this.audio.play();
      }
    } else {
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
}
