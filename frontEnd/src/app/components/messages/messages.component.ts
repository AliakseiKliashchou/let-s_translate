import {Component, OnInit} from '@angular/core';

import {OrderService} from '../../_shared/service/order/order.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import {NotificationService} from "../../_shared/service/users/notification.service";

interface msg {
  textName: string;
  textId: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../../app.component.css']
})
export class MessagesComponent implements OnInit {
// accepted paid

  msgArray=[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private ntfService: NotificationService) {
  }

  ngOnInit() {
    this.ntfService.getNotifications()
      .subscribe((res: { text: string, textName: string }[]) => {
          res.forEach(el => {
            let textInfo = el.text.split(',');
            let info = {textName: textInfo[1], textId: textInfo[2]};
            this.msgArray.push(info);
          });
        }
      )
  }

}
