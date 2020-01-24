import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

interface UserDataBack {
  isFind: boolean;
  email: string;
  name: string;
  token: string;
  role: string;
  id: number;
  coins: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean;
  private isAuthStatus = new Subject();
  private token: string;
  private id: number;
  private role: string;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  private URL = environment.apiURI;

  customerRegistration(user): Observable<any> {
    return this.http.post(`${this.URL}/create/customer`, user);
  }

  translatorRegistration(user): Observable<any> {
    return this.http.post(`${this.URL}/create/translator`, user);
  }

  log(user) {
    return this.http.post(`${this.URL}/login`, user);
  }

  login(user) {
    this.http.post(`${this.URL}/login`, user).subscribe((data: UserDataBack) => {
      if (data) {
        let token = data.token;
        const backendFakeResult = { token: data.token, name: data.name };
        let decode = jwt_decode(token);
        this.token = data.token;
        this.role = decode.role;
        this.id = decode.id;
        localStorage.setItem('currentUser', JSON.stringify(backendFakeResult));
        this.isAuth = true;
        this.isAuthStatus.next(true);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const parsedInfo = JSON.parse(authInformation.data);
    this.token = parsedInfo.token;
    let decode = jwt_decode(this.token);
    this.id = decode.id;
    this.role = decode.role;
    this.isAuth = true;
    this.isAuthStatus.next(true);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.token = '';
    this.role = '';
    this.isAuth = false;
    this.isAuthStatus.next(false);
    this.router.navigate(['/']);
  }

  getIsAuth() {
    return this.isAuth;
  }

  getIsAuthStatus() {
    return this.isAuthStatus.asObservable();
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.id;
  }

  getRole() {
    return this.role;
  }

  private getAuthData() {
    const data = localStorage.getItem('currentUser');
    if (!data) {
      return;
    }
    return {data};
  }

  sendPasswordChange(email) {
    return this.http.post(`${this.URL}/forgot-password`, {email});
  }
}
