import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(id: number) {
    return this.http.get('http://localhost:3000/secure/profile/customer/' + id);
  }
}
