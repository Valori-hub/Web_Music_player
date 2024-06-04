import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../../http-service.service';
import { Router } from '@angular/router';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  rightSectionFirstText: string | null = 'SIGN';
  rightSectionSecoundText: string | null = 'in';
  hide = true;
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private auth: authService
  ) {}

  login() {
    const formValues = this.loginForm.getRawValue();
    this.httpClient.loginUser(formValues).subscribe((response: any) => {
      if (response.result.success) {
        this.auth.getSessionData();
        this.rightSectionFirstText = 'Welcome';
        this.rightSectionSecoundText = response.result.userExist.firstName;
        setTimeout(() => {
          this.router.navigate(['']);
        }, 3000);
      } else {
        this.rightSectionFirstText = response.result.message1;
        this.rightSectionSecoundText = response.result.message2;
      }
    });
  }
}
