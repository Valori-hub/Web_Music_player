import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistCreatorComponent } from './components/playlist-creator/playlist-creator.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, outlet: 'authentication' },
  { path: 'signup', component: SignupComponent, outlet: 'authentication' },
  { path: 'playlist', component: PlaylistPageComponent },
  {
    path: 'playlist-creator',
    component: PlaylistCreatorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
