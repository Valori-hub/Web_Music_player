import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { PlaylistCreatorComponent } from '../playlist-creator.component';

@Component({
  selector: 'app-creator-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './creator-dialog.component.html',
  styleUrl: './creator-dialog.component.scss',
})
export class CreatorDialogComponent {
  playlistCreatorForm = new FormGroup({
    playlistName: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(16),
    ]),
    imageUrl: new FormControl<string>('', [Validators.required]),
    playlistDescription: new FormControl<string>(''),
  });
  constructor(public dialogRef: MatDialogRef<PlaylistCreatorComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
