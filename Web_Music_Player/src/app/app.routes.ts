import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'playlist', component: PlaylistPageComponent}
];
