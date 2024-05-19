import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { CreatorDialogComponent } from './creator-dialog/creator-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-creator',
  standalone: true,
  templateUrl: './playlist-creator.component.html',
  styleUrl: './playlist-creator.component.scss',
  imports: [SearchComponent, CreatorDialogComponent],
})
export class PlaylistCreatorComponent {
  playlist = {
    name: 'Default Name',
    description: 'Default Description',
    imageUrl: 'default-image-url.jpg',
  };
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(CreatorDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.playlist = {
          name: result.playlistName,
          description: result.playlistDescription,
          imageUrl: result.imageUrl,
        };
      }
    });
  }
}
