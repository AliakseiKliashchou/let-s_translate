import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  private URL = 'http://localhost:3000';

  getNotifications() {
    const idUser = this.authService.getUserId();
    return this.http.get(`${this.URL}/secure/notifications?idUser=${idUser}`);
  }

  readNotification(idNtf: number) {
    const idUser = this.authService.getUserId();
    console.log(idNtf)
    this.http.put(`${this.URL}/secure/notifications`, idNtf)
      .subscribe(res => console.log(res));
  }
}
