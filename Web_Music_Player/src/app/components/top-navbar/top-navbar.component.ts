import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss',
})
export class TopNavbarComponent implements OnInit {
  constructor(private httpClient: HttpService, private router: Router) {}

  ngOnInit(): void {}
  authNavigate(string: string) {
    this.router.navigateByUrl(`(authentication:${string})`);
  }
  getUsername() {
    return this.httpClient.getUsername();
  }
  isLoggedIn() {
    return this.httpClient.isLoggedIn();
  }
  //Clearing user session storage and reloading the page
  logout() {
    this.httpClient.logout();
    window.location.reload();
    this.router.navigate(['']);
  }
}
