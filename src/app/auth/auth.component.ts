import {Component, OnInit} from "@angular/core";
import {Route} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {LoginDataService} from "./services/login/login-data.service";

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  hidePwd: boolean = false;
  login: boolean = false;
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private authService: LoginDataService
  ) {
  }

  ngOnInit() {}
  toggleShowPwd() {
    this.hidePwd = !this.hidePwd;
  }
  get fl() {
    return this.loginForm.controls;
  }
  loginUser() {
    const loginData = {
      ...this.loginForm.value
    }
    this.authService.proceedLogin(loginData).subscribe({
      next: (res) => {    console.log('Login Data', res);
      },
      error:(err) => {    console.log('Login Data Err', err);
      }
    });
  }
}
