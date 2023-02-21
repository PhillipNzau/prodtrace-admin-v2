import {Injectable} from "@angular/core";
import {LocalService} from "../../../shared/service/local.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = false;

  constructor(
    private localStore: LocalService,
    private route: Router
  ) {

  }

  get isLoggedIn() {
    this.loggedIn = !!this.localStore.getData('ptlstat');

    if (!this.loggedIn) {
      this.route.navigate(['/auth']).then(() => {})
    }
    return this.loggedIn;
  }
}
