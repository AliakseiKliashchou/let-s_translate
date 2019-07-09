import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from './../../_shared/service/order/order.service';
import { OrderInterface } from 'src/app/_shared/interface/order.interface';



@Component({
  selector: 'app-text-details',
  templateUrl: './text-details.component.html',
  styleUrls: ['./text-details.component.css', '../../app.component.css']
})
export class TextDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private OrderService: OrderService) {  
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
    console.log(this.id);
  }

  ngOnInit() {    
    this.OrderService.getOrder(this.id).subscribe((data: OrderInterface) => {
      this.element.id = data.id,
      this.element.title = data.title,
      this.element.date = data.date,
      this.element.downloadURL = data.download,
      this.element.name = data.name,
      this.element.email = data.email,
      this.element.initLng = data.originalLanguage,
      this.element.finLng = data.translateLanguage,
      this.element.progress = data.progress,
      this.element.review = data.review,
      this.element.tags = data.tags,
      this.element.urgency = data.urgency
    });
  }

  private id: number;
  private routeSubscription: Subscription;
 

  element = 
    {
      id: 0, 
      title: '', 
      date: '', 
      downloadURL: '', 
      name: '',
      email: '',
      initLng: '',
      finLng: '',
      progress: 0,
      review: false,
      tags: [],
      urgency: 0
    };

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
    'Urgency' ];
  
  
}
