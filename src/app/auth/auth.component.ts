import { Component, OnInit } from '@angular/core';
import {TokenService} from "../service/token.service";
import {LoginService} from "../service/login.service";
import {Users} from "../models/user";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: any = {
    login: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private loginClientService: LoginService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { login, password } = this.form;

    this.loginClientService.loginUser(login, password).subscribe(
      (data) => {
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.reloadPage()

      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}

