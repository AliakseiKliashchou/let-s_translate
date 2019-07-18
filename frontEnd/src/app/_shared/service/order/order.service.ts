import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {AuthService} from '../users/auth.service';
import {UserInfoService} from '../users/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userInfoService: UserInfoService) {
  }

  private URL = 'http://localhost:3000';

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

  getFilteredOrder(tags, lng) {
    const params = new HttpParams()
      .set('language', lng)
      .set('tags', tags);
    return this.http.get(`${this.URL}/secure/order/filter`, {params});
  }

  getTranslatedOrders() {
    const idTranslator = this.authService.getUserId();
    return this.http.get(`${this.URL}/secure/orders/translate/` + idTranslator);
  }

  acceptOrder(idOrder: number, idTranslators: number) {
    this.http.post(`${this.URL}/secure/notification/accept`, {
      idOrder,
      idTranslators,
    }).subscribe(res => console.log(res));
  }

  selectTranslator(idWaitList: number, idTrans: number, idOrder: number) {
    this.http.post(
      `${this.URL}/secure/waitlist/selectTranslator`,
      {idWaitList, idTrans, idOrder})
      .subscribe(res => console.log(res));
  }

  getAcceptedOrderList(idCustomer: number) {
    return this.http.get(`${this.URL}/secure/waitlist/${idCustomer}`);
  }

  changeProgress(id, progress){
    return this.http.put(`${this.URL}/secure/order/`, {id, progress} );
  }

}
