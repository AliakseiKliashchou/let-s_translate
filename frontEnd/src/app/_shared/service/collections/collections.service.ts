import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './../../service/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient, 
    private authService: AuthService) { }

  getCollections(id: number){
    return this.http.get(`${this.URL}/secure/collections/${id}`);
  }

}
