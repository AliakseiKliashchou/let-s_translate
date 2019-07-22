import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {Router} from '@angular/router';
import { AdminService } from './../../_shared/service/admin/admin.service';
import { TariffInterface } from './../../_shared/interface/tariff.interface';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css'],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 4000, noPause: true, showIndicators: true}}
  ],
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private AdminService: AdminService) {
  }

  ngOnInit() {
    this.AdminService.getAdminData().subscribe( (data: any) => {
      for(let i = 0; i < data.length; i++){
        this.tariffsArray.push(data[i]);
      }
    });   
    console.log(this.tariffsArray);
  }

  tariffsArray: TariffInterface[] = [];

  goToCustomerReg() {
    this.router.navigate(['customerRegistration']);
  }


}
