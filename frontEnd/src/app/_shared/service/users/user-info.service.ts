import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private http: HttpClient,
    private  authService: AuthService) {
  }

  getUserProfile(id: number) {
    return this.http.get('http://localhost:3000/secure/profile/customer/' + id);
  }

  updateUserProfile(photo, email, name) {
    console.log(photo, email, name);
    const params = new HttpParams()
      .set('photo', photo)
      .set('email', email)
      .set('name', name);
    const userId = this.authService.getUserId();
    // return this.http.put();
  }
}
