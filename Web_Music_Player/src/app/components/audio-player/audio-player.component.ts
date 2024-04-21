import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})

export class AudioPlayerComponent {
  @Input() src!: string;
  audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  play() {
    this.audio.src = this.src;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
}
