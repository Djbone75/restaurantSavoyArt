import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string = "";
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/user/register", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>(
        "http://localhost:3000/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }
      });
  }



  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);

    this.clearAuthData();
    this.router.navigate(["/"]);
  }


  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
  }

  private clearAuthData() {
    localStorage.removeItem("token");

  }

  private getAuthData() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    return {
      token: token,

    }
  }
}