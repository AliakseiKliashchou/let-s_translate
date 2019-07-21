import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {AuthService} from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  private URL = 'http://localhost:3000';

  deleteOrder(orderId: number) {
    return this.http.delete(`${this.URL}/secure/order?id=` + orderId);
  }

  createOrder(order) {
    return this.http.post(`${this.URL}/secure/order/`, order);
  }

  getOrders() {
    const id = this.authService.getUserId();
    return this.http.get(`${this.URL}/secure/orders?idCustomer=` + id);
  }

  getUnownedOrders() {
    const idTranslator = this.authService.getUserId();
    return this.http.get(`${this.URL}/secure/orders/unowned?idTranslator=` + idTranslator);
  }

  getOrder(id: number) {
    return this.http.get(`${this.URL}/secure/order/${id}`);
  }

  getFilteredOrder(tags) {
    const idTranslator = this.authService.getUserId();
    const params = new HttpParams()
      .set('tags', tags)
      .set('idTranslator', String(idTranslator));
    return this.http.get(`${this.URL}/secure/order/filter`, {params});
  }

  getTranslatedOrders() {
    const idTranslator = this.authService.getUserId();
    return this.http.get(`${this.URL}/secure/orders/translate/` + idTranslator);
  }

  acceptOrder(idOrder: number, idTranslators: number) {
    this.http.post(`${this.URL}/secure/notification/accept`,
      {idOrder, idTranslators})
      .subscribe(res => console.log(res));
  }

  changeProgress(id, progress) {
    return this.http.put(`${this.URL}/secure/order/`, {id, progress});
  }
  changePrice(id, price){
    return this.http.put(`${this.URL}/secure/price/`, {id, price});
  }

}
