import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


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

  getUnownedOrders() {
    return this.http.get(`${this.URL}/secure/order/unowned`);
  }

  getOrder(id: number) {
    return this.http.get(`${this.URL}/secure/order/${id}`);
  }

  getFilteredOrder(tags, lng) {
    const params = new HttpParams()
    .set('language', lng)
    .set('tags', tags);
    return this.http.get(`${this.URL}/secure/order/filter`, {params});
  }

  acceptOrder(idOrder: number, idTranslators: number, idCustomer: number) {
    this.http.post(`${this.URL}/secure/waitlist/accept`, {
      idOrder,
      idTranslators,
      idCustomer
    }).subscribe(res => console.log(res));
  }

  selectTranslator(idWaitlist: number, idTrans: number, idOrder: number) {
    this.http.post(
      `${this.URL}/secure/waitlist/selectTranslator`,
      {idWaitlist, idTrans, idOrder})
      .subscribe(res => console.log(res));
  }

  getAcceptedOrderList(idCustomer: number) {
    return this.http.get(`${this.URL}/secure/waitlist/${idCustomer}`);
  }

}
