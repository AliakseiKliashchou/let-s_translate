import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderInterface} from 'src/app/_shared/interface/order.interface';
import {CommentsInterface} from 'src/app/_shared/interface/comments.interface';
import {OrderService} from '../../_shared/service/order/order.service';
import {MessagesService} from '../../_shared/service/messages/messages.service';
import {AuthService} from '../../_shared/service/users/auth.service';


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
  role: string;
  saveProgressBtn = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService,
    private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.routeSubscription = this.route.params.subscribe(params => this.id = params.id);
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

    // console.log(Date.now() - this.incomingComments[0].);


  }

  sendComment(text) {
    // const id = this.au
    const message = {
      senderEmail: JSON.parse(localStorage.getItem('currentUser')).email,
      role: JSON.parse(localStorage.getItem('currentUser')).role,
      idCommentator: JSON.parse(localStorage.getItem('currentUser')).id,
      idOrder: this.element.id,
      name: JSON.parse(localStorage.getItem('currentUser')).name,
      message: text,
      date: Date.now()
    };
    this.messagesService.createMessage(message).subscribe(() => {
      this.messagesService.getMessages(this.element.id).subscribe((data: any) => {
        const item = data.length - 1;
        this.incomingComments.push(data[item]);
      });
    });
  }

  changeSlider(val) {
    this.element.progress = val;
    this.saveProgressBtn = true;
  }

  saveProgress() {
    this.orderService.changeProgress(this.element.id, this.element.progress).subscribe((data) => {
      console.log(data);
    });
  }

  deleteText() {
    const orderId = this.element.id;
    this.orderService.deleteOrder(orderId).subscribe(res => {
      console.log(res);
      this.router.navigate(['dashboard']);
    });
  }
}
