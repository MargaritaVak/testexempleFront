import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    login: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;


  constructor(private resisterClientService: LoginService, private tokenService: TokenService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { username, login, password } = this.form;

    this.resisterClientService.registerUser(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.resisterClientService.loginUser(login, password).subscribe(
          (data) => {
            this.tokenService.saveToken(data.accessToken);
            this.tokenService.saveUser(data);

            this.isLoginFailed = false;
            this.isLoggedIn = true;

          },
          (err) => {
            this.errorMessage = err.error.message;
            console.log(err);
            this.isLoginFailed = true;
          }
        );
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }

}
