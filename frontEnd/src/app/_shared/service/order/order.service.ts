import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  private URL = 'http://localhost:3000';

  createOrder(order) {
    return this.http.post(`${this.URL}/secure/order/`, order);
  }

  getOrders() {
    return this.http.get(`${this.URL}/secure/order/`);
  }


  getOrder(id: number) {
    return this.http.get(`${this.URL}/secure/order/${id}`);

  }
}
