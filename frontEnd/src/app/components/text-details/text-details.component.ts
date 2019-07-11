import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from '../../_shared/service/order/order.service';
import {OrderInterface} from 'src/app/_shared/interface/order.interface';
import {CommentsInterface} from 'src/app/_shared/interface/comments.interface'
import {MessagesService} from '../../_shared/service/messages/messages.service';


@Component({
  selector: 'app-text-details',
  templateUrl: './text-details.component.html',
  styleUrls: ['./text-details.component.css', '../../app.component.css']
})
export class TextDetailsComponent implements OnInit {
  private id: number;
  private routeSubscription: Subscription;
  element: OrderInterface;
  headElements = [
    'order ID',
    'Title',
    'Date',
    'Download URL',
    'Name of customer',
    'Customer E-mail',
    'Initial language',
    'Finite language',
    'Review',
    'Tags',
    'Urgency'
  ];
  incomingComments: CommentsInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => this.id = params['id']);
    this.orderService.getOrder(this.id).subscribe((order: OrderInterface) => {
      this.element = order;
      this.messagesService.getMessages(this.element.id).subscribe((data: any) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            this.incomingComments.push(data[i]);
          }
        } else console.log('empty db');
      });
    });

  }

  sendComment(text) {
    let message = {
      senderEmail: JSON.parse(localStorage.getItem('currentUser')).email,
      role: JSON.parse(localStorage.getItem('currentUser')).role,
      idCommentator: JSON.parse(localStorage.getItem('currentUser')).id,
      idOrder: this.element.id,
      name: JSON.parse(localStorage.getItem('currentUser')).name,
      message: text,
      date: Date.now()
    };
    console.log(message);
    this.messagesService.createMessage(message).subscribe((data) => {
      console.log(data);
    });
  }

}
