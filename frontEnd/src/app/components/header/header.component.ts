import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../_shared/service/users/auth.service';
import {UserInfoService} from '../../_shared/service/users/user-info.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  userInput = {
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)])
  };
  role = '';
  user = {
    email: '',
    password: '',
    role: ''
  };
  isWindowSizeSmall: boolean = (window.innerWidth < 1200);
  isClose = true;
  isAuth = false;
  userProfile;


  constructor(
    private _router: Router,
    private authService: AuthService,
    private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authService.getIsAuthStatus().subscribe((res: boolean) => {
      this.isAuth = res;
    });
    if (this.isAuth) {
      const userId = this.authService.getUserId();
      this.userInfoService.getUserProfile(userId).subscribe((res => {
        this.userProfile = res;
      }));
    }
  }

  // --------VALIDATION------------------------------

  getErrorMessageEmail() {
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
      this.userInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
      this.userInput.password.hasError('minlength') ? 'The password is too short' :
        this.userInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }

  // --------------------------------------------------

  checkInp(role, value, flag) {
    // this.role = role;
    switch (role) {
      case 'customer':
        if (flag === 'email') {
          this.user.email = value;
          this.user.role = role;
        }
        if (flag === 'password') {
          this.user.password = value;
          this.user.role = role;
        }
        break;

      case 'translator':
        if (flag === 'email') {
          this.user.email = value;
          this.user.role = role;
        }
        if (flag === 'password') {
          this.user.password = value;
          this.user.role = role;
        }
        break;
    }
  }

  submit(frame) {
    frame.hide();
    this.authService.login(this.user);
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isClose = !this.isClose;
  }

  resizeWindow() {
    this.isWindowSizeSmall = (window.innerWidth < 1200);
    if (!this.isWindowSizeSmall) this.isClose = true;
  }

}
