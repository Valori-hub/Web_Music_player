import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { merge } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http-service.service';


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
    
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userData = { username: '', email: '', password: '', firstName: '', lastName: '', gender: '' };
  confirmPassword = '';
   hide = true;
   email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  constructor(private http: HttpClient, private httpClient: HttpService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
 
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  register(): void {
    this.httpClient.createUser(this.userData).subscribe(
      response => {
        console.log('Account has been created!', response, this.userData);
      }
    )
  }
  // register(){
  //   if(this.confirmPassword != this.userData.password)
  //     {
  //       console.log("passwords are not the same")
  //     }else{
  //       console.log(this.userData);
  //     }
  //     this.httpClient.createUser(this.userData);
  // }
}

