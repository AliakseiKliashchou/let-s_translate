import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reg-new-translator',
  templateUrl: './reg-new-translator.component.html',
  styleUrls: ['./reg-new-translator.component.css', '../../app.component.css']
})
export class RegNewTranslatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hide_1 = true;
  hide_2 = true;
  
  userInput = {
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password_1: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    password_2: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),  
  }
  getErrorMessageEmail(){
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
    this.userInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }
  getErrorMessagePassword_1(){
    return this.userInput.password_1.hasError('required') ? 'You must enter a value' :
      this.userInput.password_1.hasError('minlength') ? 'The password is too short' :
      this.userInput.password_1.hasError('maxlength') ? 'The password is too long' : '';
  }
  getErrorMessagePassword_2(){
    return this.userInput.password_2.hasError('required') ? 'You must enter a value' :
      this.userInput.password_2.hasError('minlength') ? 'The password is too short' :
      this.userInput.password_2.hasError('maxlength') ? 'The password is too long' : '';
  }
  
  getErrorMessageName(){
    return this.userInput.name.hasError('required') ? 'You must enter a value' :
    this.userInput.name.hasError('pattern') ? 'The name field should not contains numbers' :
        '';
  }

//--------------------------------------------------------------------------------


}
