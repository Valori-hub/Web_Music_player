import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { merge } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  rightSectionFirstText: string | null = 'Sign';
  rightSectionSecoundText: string | null = 'up';
  errorMessage = '';
  hide = true;
  validatePasswordConfirmation: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    if (!control.parent) {
      return null;
    }
    const passwordControl = control.parent.get('password');
    const confirmPasswordControl = control.parent.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      return { validatePasswordConfirmation: true };
    }
    return null;
  };
  registrationForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      this.validatePasswordConfirmation,
    ]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    gender: new FormControl<string>('', [Validators.required]),
  });

  getPasswordLabel(): string {
    return this.registrationForm.hasError('validatePasswordConfirmation')
      ? 'Passwords do not match'
      : 'Confirm your password';
  }
  constructor(private httpClient: HttpService, private router: Router) {
    merge(
      this.registrationForm.controls.email.statusChanges,
      this.registrationForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.registrationForm.controls.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.registrationForm.controls.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  register(): void {
    const formValues = this.registrationForm.getRawValue();
    this.httpClient.createUser(formValues).subscribe((response: any) => {
      if (response.data.success) {
        this.router.navigateByUrl('(authentication:login)');
        console.log('User created!');
      } else if (!response.data.success) {
        console.log('Invalid user data');
      }
    });
  }
}
