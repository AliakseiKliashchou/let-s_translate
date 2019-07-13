import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../_shared/service/users/auth.service';

@Component({
  selector: 'app-reg-new-translator',
  templateUrl: './reg-new-translator.component.html',
  styleUrls: ['./reg-new-translator.component.css', '../../app.component.css']
})
export class RegNewTranslatorComponent implements OnInit {

  emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  hide_1 = true;
  hide_2 = true;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  userInput = {
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    passwordSubmitted: new FormControl('',
      [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    name: new FormControl('',
      [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  getErrorMessageEmail() {
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
      this.userInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword_1() {
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
      this.userInput.password.hasError('minlength') ? 'The password is too short' :
        this.userInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }

  getErrorMessagePassword_2() {
    return this.userInput.passwordSubmitted.hasError('required') ? 'You must enter a value' :
      this.userInput.passwordSubmitted.hasError('minlength') ? 'The password is too short' :
        this.userInput.passwordSubmitted.hasError('maxlength') ? 'The password is too long' : '';
  }

  getErrorMessageName() {
    return this.userInput.name.hasError('required') ? 'You must enter a value' :
      this.userInput.name.hasError('pattern') ?
        'The name field should not contains numbers' : '';
  }

// --------------------------------------------------------------------------------
lngArray = [];
getLng(lng) { 
  this.lngArray = lng;
}
  register() {
    if (this.userInput.name.valid && this.userInput.email.valid
      && (this.userInput.password.value === this.userInput.passwordSubmitted.value)) {
      const user = {
        name: this.userInput.name.value,
        email: this.userInput.email.value,
        role: 'translator',
        password: this.userInput.password.value,
        languages: this.lngArray,
      };
      this.authService.translatorRegistration(user).subscribe(res => console.log(res));
    } else return;
  }

}
