import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from './../../_shared/service/order/order.service';

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
    this.OrderService.getOrder(this.id).subscribe((data) => {
      console.log(data);
    });
  }

  private id: number;
  private routeSubscription: Subscription;
  
  
}
