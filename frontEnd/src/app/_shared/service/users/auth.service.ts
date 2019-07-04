import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from "@angular/router";

interface UserDataBack {
  isFind: boolean;
  email: string;
  name: string;
  token: string;
  role: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean;
  private isAuthStatus = new Subject();
  private token: string;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  private URL = 'http://localhost:3000';

  customer_reg(user): Observable<any> {
    return this.http.post(`${this.URL}/create/customer`, user, this.httpOptions);
  }

  login(user) {
    this.http.post(`${this.URL}/login`, user, this.httpOptions).subscribe((data: UserDataBack) => {
      if (data.isFind) {
        const backendFakeResult = {
          id: data.id,
          email: data.email,
          name: data.name,
          token: data.token,
          role: data.role
        };
        localStorage.setItem('currentUser', JSON.stringify(backendFakeResult));
        this.isAuth = true;
        this.isAuthStatus.next(true);
        console.log(this.isAuth)
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = JSON.parse(authInformation.data).token;
    this.isAuth = true;
    this.isAuthStatus.next(true);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.token = '';
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

  private getAuthData() {
    const data = localStorage.getItem('currentUser');
    if (!data) {
      return;
    }
    return {data};
  }
}
