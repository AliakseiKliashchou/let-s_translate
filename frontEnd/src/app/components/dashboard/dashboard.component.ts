import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../_shared/service/order/order.service';
import {OrderInterface} from '../../_shared/interface/order.interface';

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


  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      (orders: OrderInterface[]) => {
        this.ordersArray = orders;
      }
    );
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


}
