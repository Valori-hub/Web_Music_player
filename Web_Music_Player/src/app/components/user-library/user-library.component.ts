import { Component } from '@angular/core';
import { UserPlaylistComponent } from '../user-playlist/user-playlist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-library',
  standalone: true,
  imports: [UserPlaylistComponent, CommonModule],
  templateUrl: './user-library.component.html',
  styleUrl: './user-library.component.scss',
})
export class UserLibraryComponent {}
