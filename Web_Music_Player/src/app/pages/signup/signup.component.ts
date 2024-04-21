import { Component } from '@angular/core';
import { MatCardModule, } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
