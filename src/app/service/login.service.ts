import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Users} from "../models/user";
import {Observable} from "rxjs";
import {environment} from "../../environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private registerClientUrl = `${environment.URL_server}/register-user`;
  private loginClientUrl = `${environment.URL_server}/login-user`;
  constructor(private http: HttpClient, public router: Router) {}

  registerUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.registerClientUrl, user, httpOptions);
  }

  loginUser(login: string, password: string): Observable<any> {
    return this.http.post(
      this.loginClientUrl,
      {
        login,
        password,
      },
      httpOptions
    );
  }
}
