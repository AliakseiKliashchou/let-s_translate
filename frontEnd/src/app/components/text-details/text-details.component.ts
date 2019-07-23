import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderInterface} from 'src/app/_shared/interface/order.interface';
import {CommentsInterface} from 'src/app/_shared/interface/comments.interface';
import {OrderService} from '../../_shared/service/order/order.service';
import {MessagesService} from '../../_shared/service/messages/messages.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';


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
    'Urgency',
    'Price'
  ];
  incomingComments: CommentsInterface[] = [];
  role: string;
  saveProgressBtn = false;
  textUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService,
    private messagesService: MessagesService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar) {
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

  getRelativeDate(i) {
    const commentDate = new Date(this.incomingComments[i].date);
    return moment(commentDate).fromNow();
  }

  sendComment(textarea) {
    // const id = this.au
    const text = textarea.value;
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
        console.log(data);
        const item = data.length - 1;
        this.incomingComments.push(data[item]);
      });
    });
    textarea.value = '';
  }

  changeSliderTranslator(val) {
    this.element.progress = val;
    this.saveProgressBtn = true;
  }

  changeSliderCustomer(val) {
    this.element.price = val;
    this.saveProgressBtn = true;
  }

  savePrice() {
    this.orderService.changePrice(this.element.id, this.element.price).subscribe((data) => {
      console.log(data);
      this._snackBar.open('The price was successfully changed', '', {
        duration: 2000,
      });
    });
  }

  saveProgress() {
    this.orderService.changeProgress(this.element.id, this.element.progress).subscribe((data) => {
      console.log(data);
      this._snackBar.open('The progress was successfully changed', '', {
        duration: 2000,
      });
    });
  }

  deleteText() {
    const orderId = this.element.id;
    this.orderService.deleteOrder(orderId).subscribe(res => {
      console.log(res);
      this.router.navigate(['dashboard']);
    });
  }

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const path = `photos/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
          const url = ref.getDownloadURL();
          url.subscribe(urlRes => {
            this.textUrl = urlRes;
            this._snackBar.open('The document was successfully uploaded', '', {
              duration: 2000,
            });
          });
        }
      )
    ).subscribe();
  }

}
