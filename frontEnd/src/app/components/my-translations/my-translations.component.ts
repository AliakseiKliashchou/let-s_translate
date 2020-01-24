import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../_shared/service/users/auth.service';
import {OrderService} from '../../_shared/service/order/order.service';
import {OrderInterface} from '../../_shared/interface/order.interface';


@Component({
  selector: 'app-my-translations',
  templateUrl: './my-translations.component.html',
  styleUrls: ['./my-translations.component.css', '../../app.component.css']
})
export class MyTranslationsComponent implements OnInit {
  translateListArray: OrderInterface[];

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getTranslatedOrders().subscribe((orders: OrderInterface[]) => {
      this.translateListArray = orders;
    });
  }

}
