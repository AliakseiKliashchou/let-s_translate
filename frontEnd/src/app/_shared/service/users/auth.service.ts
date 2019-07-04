import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

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

  customer_reg(user): Observable<any> {
    return this.http.post(`${this.URL}/create/customer`, user, this.httpOptions);
  }

  login(user): Observable<any> {
    return this.http.post(`${this.URL}/login`, user, this.httpOptions);
  }

  // isAuth(): Observable<any> {

  // }
}
