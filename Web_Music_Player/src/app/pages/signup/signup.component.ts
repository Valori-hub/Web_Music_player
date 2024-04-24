import { Component } from '@angular/core';
import { MatCardModule, } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatCardModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
}
