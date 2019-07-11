import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  private URL = 'http://localhost:3000';

  getMessages(id: number) {
    return this.http.get(`${this.URL}/secure/message/${id}`);
  }

  createMessage(message) {
    return this.http.post(`${this.URL}/secure/message/`, message);
  }
}
