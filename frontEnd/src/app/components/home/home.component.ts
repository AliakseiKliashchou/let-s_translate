import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {Router} from '@angular/router';

import {TariffInterface} from '../../_shared/interface/tariff.interface';
import {AdminService} from '../../_shared/service/admin/admin.service';
import {AuthService} from '../../_shared/service/users/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css'],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 4000, noPause: true, showIndicators: true}}
  ],
})
export class HomeComponent implements OnInit {
  tariffsArray: TariffInterface[] = [];
  progressBar = false;
  auth = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.progressBar = true;
    this.auth = this.authService.getIsAuth();
    this.authService.getIsAuthStatus().subscribe((status: boolean) => this.auth = status);
    this.adminService.getTariffs().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.tariffsArray.push(data[i]);
      }
    });
    this.progressBar = false;
  }

}
