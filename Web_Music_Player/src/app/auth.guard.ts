import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor() {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('username');
  }
}
