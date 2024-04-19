import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SignupComponent } from './pages/signup/signup.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
];
