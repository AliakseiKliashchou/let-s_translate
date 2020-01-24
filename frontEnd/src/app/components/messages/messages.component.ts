import {Component, OnInit} from '@angular/core';

import {OrderService} from '../../_shared/service/order/order.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import {NotificationService} from '../../_shared/service/users/notification.service';

interface Msg {
  text: string;
  textName: string;
  id: number
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../../app.component.css']
})
export class MessagesComponent implements OnInit {
// accepted paid
  msgArray = [];
  progressBar = false;
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private ntfService: NotificationService) {
  }

  ngOnInit() {
    this.progressBar = true;
    this.ntfService.getNotifications()
      .subscribe((res: Msg[]) => {
          res.forEach(el => {
            const textInfo = el.text.split(',');
            const info = {
              status: textInfo[0],
              textName: textInfo[1],
              textId: textInfo[2],
              id: el.id
            };
            this.msgArray.push(info);
          });
        }
      );
    this.progressBar = false;
  }

  readMsg(indexOfMsg) {
    this.progressBar = true;
    const idNtf = this.msgArray[indexOfMsg].id;
    this.ntfService.readNotification(idNtf)
      .subscribe(res => {
        this.msgArray.splice(indexOfMsg, 1);
        this.ntfService.sendMessage(this.msgArray.length);
      });
    this.progressBar = false;
  }

}
