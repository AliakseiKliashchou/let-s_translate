import {Component, EventEmitter, OnInit} from '@angular/core';
import {OrderService} from '../../_shared/service/order/order.service';
import {OrderInterface} from '../../_shared/interface/order.interface';
import {AuthService} from "../../_shared/service/users/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../app.component.css']
})
export class DashboardComponent implements OnInit {
  status = [
    'Waiting translator',
    'In progress',
    'Ready for translator review',
    'Ready for customer review'
  ];
  ordersArray: OrderInterface[];
  role: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.role = this.authService.getRole();
    console.log(this.role)
    if (this.role === 'translator')
      this.orderService.getUnownedOrders()
        .subscribe((orders: OrderInterface[]) => this.ordersArray = orders);
    else this.orderService.getOrders()
      .subscribe((orders: OrderInterface[]) => this.ordersArray = orders);
  }

  getColor(status) {
    switch (status) {
      case 0:
        return '#DA111A';
      case 1:
        return '#d09515';
      case 2:
      case 3:
        return '#5546E4';
    }
  }

  getOrder(idOrder: number, idCustomer: number) {
    let id = this.authService.getUserId();
    this.orderService.acceptOrder(idOrder, id, idCustomer);
  }


}
