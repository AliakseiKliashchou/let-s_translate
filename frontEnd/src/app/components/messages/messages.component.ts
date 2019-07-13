import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../_shared/service/order/order.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

interface WaitListModel {
  id: number;
  idCustomer: number;
  idOrder: {
    title: string;
    id: number;
    tags: [];
  };
  idTranslators: {
    id: number;
    email: string;
    name: string;
  }[];
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../../app.component.css']
})
export class MessagesComponent implements OnInit {
  waitlistArray: WaitListModel[];
  waitListForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
  }

  ngOnInit() {
    const id = this.authService.getUserId();
    this.orderService.getAcceptedOrderList(id)
      .subscribe((res: WaitListModel[]) => {
        this.waitlistArray = res;
        this.waitListForm = new FormGroup({});
        res.forEach(question => {
          const name = `waitlist_${question.id}`;
          this.waitListForm.addControl(name, new FormControl(null));
        });
      });
  }

  acceptTranslator(waitItem) {
    const name = `waitlist_${waitItem}`
    const valueByRadioBtn = this.waitListForm.value[name];
    console.log(valueByRadioBtn);
    // send to back idTrans and idOrders;
  }

  resetInfo(waitItem) {
    const name = `waitlist_${waitItem}`;
    this.waitListForm.controls[name].reset();
  }

}
