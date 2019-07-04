import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  private URL = 'http://localhost:3000';

  public customer_reg(user) {
    return this.http.post(`${this.URL}/create/customer`, user, this.httpOptions);
  }

  public login(user) {
    return this.http.post(`${this.URL}/login`, user, this.httpOptions);
  }

  public isAuth() {

  }
}
