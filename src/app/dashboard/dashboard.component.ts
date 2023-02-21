import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LocalService } from '../shared/service/local.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
})
export class DashboardComponent {
  constructor(private localStore: LocalService, private route: Router) {}
  logout() {
    this.localStore.clearData();
    this.route.navigateByUrl('/auth').then(() => {});
  }
}
