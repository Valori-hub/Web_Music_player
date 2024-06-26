import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private auth: authService
  ) {}
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
