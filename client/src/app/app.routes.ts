import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistCreatorComponent } from './components/playlist-creator/playlist-creator.component';
import { SearchComponent } from './components/search/search.component';
import { UserLibraryComponent } from './components/user-library/user-library.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    outlet: 'authentication',
  },
  {
    path: 'signup',
    component: SignupComponent,
    outlet: 'authentication',
  },
  { path: 'playlist', component: PlaylistPageComponent },
  {
    path: 'user-library',
    component: UserLibraryComponent,
  },
  {
    path: 'playlist-creator',
    component: PlaylistCreatorComponent,
  },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
