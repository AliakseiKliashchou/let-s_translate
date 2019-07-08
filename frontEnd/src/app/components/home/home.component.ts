import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css'],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 4000, noPause: true, showIndicators: true}}
  ],
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  goToCustomerReg() {
    this._router.navigate(['customerRegistration']);
  }


}
