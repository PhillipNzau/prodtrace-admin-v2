import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink
  ]
})
export class DashboardComponent {

}
