import { Component } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player.component';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [AudioPlayerComponent],
  templateUrl: './module.component.html',
  styleUrl: './module.component.scss'
})
export class ModuleComponent {

}
