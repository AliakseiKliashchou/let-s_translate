import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }
  private URL = 'http://localhost:3000';

  getMessages(id: number){
    return this.http.get(`${this.URL}/message/${id}`);
  }
}
