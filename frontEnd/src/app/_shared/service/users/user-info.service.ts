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

  private URL = 'http://localhost:3000';

  getCustomerProfile(id: number) {
    return this.http.get(`${this.URL}/secure/profile/customer/${id}`);
  }

  getTranslatorProfile(id: number) {
    return this.http.get(`${this.URL}/secure/profile/translator/${id}`);
  }

  updateUserProfile(photo, email, name) {
    const data = {photo, email, name};
    const userId = this.authService.getUserId();
    this.http.put(`${this.URL}/secure/profile/customer/${userId}`, data)
      .subscribe(res => console.log(res));
  }

  changePassword(password, email) {
    return this.http.put(`${this.URL}/reset-password`, {password, email});
  }

  addMoney(money) {
    const idCustomer = this.authService.getUserId();
    return this.http.put(`${this.URL}/secure/profile/customer/${idCustomer}/money`, {money});
  }
}
