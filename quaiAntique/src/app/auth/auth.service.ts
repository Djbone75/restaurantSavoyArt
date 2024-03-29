import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';
import { Subject } from 'rxjs';
import { user } from 'src/models/user.model';
import { AuthData } from './auth-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token?: string;

  private userData?: string;
  private user?: user | null;

  private authStatusListener = new Subject<boolean>();
  private userListener = new Subject<user | null>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUser() {
    return this.user;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserListener() {
    return this.userListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post(BACKEND_URL + '/register', authData)
      .subscribe((response) => {
        this.snackBar.open('merci de vous êtres inscrit', '', {
          duration: 2000,
        });
        this.router.navigate(['/']);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    try {
      this.http
        .post<{ token: string; user: user }>(BACKEND_URL + '/login', authData)
        .subscribe((response) => {
          const token = response.token;
          const user = response.user;
          this.token = token;
          this.user = user;

          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.userListener.next(this.user);
            console.log('?');
            this.saveAuthData(token, user);
            this.router.navigate(['/']);
          } else {
            this.snackBar.open('utilisateur non trouvé', '', {
              duration: 2000,
            });
            this.router.navigate(['/login']);
          }
        });
    } catch {
      this.snackBar.open('utilisateur non trouvé', '', {
        duration: 2000,
      });
      this.router.navigate(['/']);
    }
  }

  retrieveUser() {
    return this.http.get<user>(BACKEND_URL + '/user');
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    this.userListener.next(null);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  AutoauthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation?.token) {
      return;
    }
    this.token = authInformation.token;
    this.userData = authInformation.userData;
    this.user = JSON.parse(this.userData);

    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    this.userListener.next(this.user || null);
  }

  private saveAuthData(token: string, user: user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      return;
    }

    return {
      token,
      userData,
    };
  }

  updateUser(updateUser: user) {
    this.http
      .put<{ user: user }>(BACKEND_URL + '/user', updateUser)
      .subscribe((data) => {
        this.user = data.user;
        this.userListener.next(data.user);
      });
  }
}
