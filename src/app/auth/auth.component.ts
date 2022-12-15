import {Component, OnInit} from "@angular/core";
import {Route} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  hidePwd: boolean = false;
  login: boolean = false;
  constructor() {
  }

  ngOnInit() {}

  viewPwd() {

  }
}

// export const ROUTES: Route[] = [
//   {path:'auth', loadComponent: () =>}
// ]
