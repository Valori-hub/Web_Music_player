import { Component, OnInit } from '@angular/core';
import { UserPlaylistComponent } from '../user-playlist/user-playlist.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-user-library',
  standalone: true,
  imports: [UserPlaylistComponent, CommonModule],
  templateUrl: './user-library.component.html',
  styleUrl: './user-library.component.scss',
})
export class UserLibraryComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpService,
    private auth: authService
  ) {}
  ngOnInit(): void {
    this.isLoggedin();
  }
  isLoggedin() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
