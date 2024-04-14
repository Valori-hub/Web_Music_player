import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TopNavbarComponent } from "../../components/top-navbar/top-navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatIconModule,
        TopNavbarComponent
    ]
})
export class HomeComponent {
  
}
