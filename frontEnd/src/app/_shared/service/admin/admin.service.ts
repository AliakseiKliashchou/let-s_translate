import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../users/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  private URL = environment.apiURI;

  getTariffs() {
    return this.http.get(`${this.URL}/tariff`);
  }

  changeTariffPlan(tariff) {
    return this.http.put(`${this.URL}/secure/tariff/`, tariff);
  }
}
