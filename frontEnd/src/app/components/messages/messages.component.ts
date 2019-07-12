import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../_shared/service/order/order.service';
import {AuthService} from '../../_shared/service/users/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../../app.component.css']
})
export class MessagesComponent implements OnInit {
  acceptedOrderArray: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
  }

  ngOnInit() {
    const id = this.authService.getUserId();
    this.orderService.getAcceptedOrderList(id)
      .subscribe(res => {
        console.log(res);
        this.acceptedOrderArray = res;
      });
  }

}
