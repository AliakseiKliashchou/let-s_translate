import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'access-token': JSON.parse(localStorage.getItem('currentUser')).token
    })
  };
  private URL = 'http://localhost:3000';

  createOrder(order) {
    return this.http.post(`${this.URL}/secure/order/`, order, this.httpOptions);
  }

  getOrders() {
    return this.http.get(`${this.URL}/secure/order/`, this.httpOptions);
  }


  getOrder(id: number) {
    return this.http.get(`${this.URL}/secure/order/${id}`, this.httpOptions);

  }
}
