import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  private URL = environment.apiURI;

  getMessages(id: number) {
    return this.http.get(`${this.URL}/secure/message/${id}`);
  }

  createMessage(message) {
    return this.http.post(`${this.URL}/secure/message/`, message);
  }
}
