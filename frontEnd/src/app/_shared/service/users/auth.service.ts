import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

interface UserDataBack {
  isFind: boolean;
  email: string;
  name: string;
  token: string;
  role: string;
  id: number;
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

  private URL = 'http://localhost:3000';

  customerRegistration(user): Observable<any> {
    return this.http.post(`${this.URL}/create/customer`, user);
  }

  translatorRegistration(user): Observable<any> {
    return this.http.post(`${this.URL}/create/translator`, user);
  }

  log(user){
    return this.http.post(`${this.URL}/login`, user)
  }

  login(user) {
    this.http.post(`${this.URL}/login`, user).subscribe((data: UserDataBack) => {
      if (data.isFind) {
        const backendFakeResult = {
          id: data.id,
          email: data.email,
          name: data.name,
          token: data.token,
          role: data.role
        };
        this.token = data.token;
        this.role = data.role;
        this.id = data.id;
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
    this.id = parsedInfo.id;
    this.role = parsedInfo.role;
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
}
