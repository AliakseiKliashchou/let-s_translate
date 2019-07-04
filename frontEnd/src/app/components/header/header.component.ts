import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../_shared/service/users/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router: Router,
    private http: AuthService) {
  }

  ngOnInit() {
  }

  //---------navigation-----------------------
  navigate_home() {
    this._router.navigate(['/']);
  }

  navigate_dashboard() {
    this._router.navigate(['dashboard']);
  }

  navigate_newTexts() {
    this._router.navigate(['new_texts']);
  }

  navigate_myTranslations() {
    this._router.navigate(['my_translations']);
  }

  navigate_messages() {
    this._router.navigate(['messages']);
  }

  new_translator_reg() {
    this._router.navigate(['new_translator_reg']);
  }

  //----------------------------------------------

  //--------VALIDATION------------------------------
  userInput = {
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)])
  }

  getErrorMessageEmail() {
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
      this.userInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
      this.userInput.password.hasError('minlength') ? 'The password is too short' :
        this.userInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }

  //--------------------------------------------------

  role = '';
  user = {
    email: '',
    password: '',
    role: ''
  }

  checkInp(role, value, flag) {
    //this.role = role; 
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

  submit() {
    console.log(this.user);
    this.http.login(this.user).subscribe((data) => {
      console.log(data);
    });
  }

}
