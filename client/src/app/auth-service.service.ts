import { catchError, throwError } from 'rxjs';
import { HttpService } from './http-service.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class authService {
  username: string | null;
  constructor(private httpClient: HttpService) {}

  getSessionData() {
    this.httpClient.getSessionData().subscribe((result) => {
      this.username = result.username;
    });
  }
  isLoggedIn(): boolean {
    if (this.username !== '' && this.username !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  getUsername(): string {
    if (this.username != null) {
      return this.username;
    }
    return '';
  }
}
