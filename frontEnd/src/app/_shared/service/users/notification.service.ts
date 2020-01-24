import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  private URL = environment.apiURI;

  sendMessage(message: number): void {
    this.subject.next(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getNotifications() {
    const idUser = this.authService.getUserId();
    return this.http.get(`${this.URL}/secure/notifications?idUser=${idUser}`);
  }

  readNotification(idNtf: number) {
    return this.http.delete(`${this.URL}/secure/notifications?idNtf=${idNtf}`);
  }
}
