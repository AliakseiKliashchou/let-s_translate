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

  getCustomerProfile(id: number) {
    return this.http.get('http://localhost:3000/secure/profile/customer/' + id);
  }

  getTranslatorProfile(id: number) {
    return this.http.get('http://localhost:3000/secure/profile/translator/' + id);
  }

  updateUserProfile(photo, email, name) {
    console.log(photo);
    const data = {photo, email, name};
    const userId = this.authService.getUserId();
    this.http.put(`http://localhost:3000/secure/profile/customer/${userId}`, data).subscribe(res => console.log(res));
  }
}
