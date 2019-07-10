import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from './../../_shared/service/order/order.service';
import { OrderInterface } from 'src/app/_shared/interface/order.interface';
import { CommentsInterface } from 'src/app/_shared/interface/comments.interface'
import { MessagesService } from './../../_shared/service/messages/messages.service';



@Component({
  selector: 'app-text-details',
  templateUrl: './text-details.component.html',
  styleUrls: ['./text-details.component.css', '../../app.component.css']
})
export class TextDetailsComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,  
    private OrderService: OrderService,
    private MessagesService: MessagesService) {  
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);    
  }

  ngOnInit() {    
    this.OrderService.getOrder(this.id).subscribe((data: OrderInterface) => {
      console.log(data);
     this.element = data;
      this.MessagesService.getMessages(this.element.id).subscribe( (data: any) => {
        if(data){
          console.log(typeof this.incomingComments);
          for(let i = 0; i < data.length; i++){
            this.incomingComments.push(data[i]);
          }
          console.log(this.incomingComments);
          console.log(this.incomingComments[0].name);
        }else console.log('empty db');
      });
    });
   
  }

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
    
    incomingComments : CommentsInterface[] = [];

    sendComment(text){
      let message = {
        senderEmail: JSON.parse(localStorage.getItem('currentUser')).email, 
        role: JSON.parse(localStorage.getItem('currentUser')).role, 
        idCommentator: JSON.parse(localStorage.getItem('currentUser')).id, 
        idOrder: this.element.id,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        message: text,
        date: Date.now()
      }
      console.log(message);
      this.MessagesService.createMessage(message).subscribe( (data) => {
        console.log(data);
      });
    }
  
}
