import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

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

  constructor(private http: HttpClient) {
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
      }
    });
  }

  autoAuthUser() {

  }

  logout() {
    localStorage.clear();
    this.isAuth = false;
    this.isAuthStatus.next(false);
  }

  getIsAuth() {
    return this.isAuth;
  }

  getIsAuthStatus() {
    return this.isAuthStatus.asObservable();
  }
}
