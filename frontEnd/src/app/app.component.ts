import {Component, OnInit} from '@angular/core';
import {routerAnimations} from './animations';
import {AuthService} from './_shared/service/users/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {
  title = 'frontEnd';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
