import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-reg',
  templateUrl: './customer-reg.component.html',
  styleUrls: ['./customer-reg.component.css', '../../app.component.css']
})
export class CustomerRegComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
//----------------Validation---------------------------------------------------
  hide = true;
  userInput = {
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
    cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
    cardCVC: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
  }
  getErrorMessageEmail(){
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
    this.userInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }
  getErrorMessagePassword(){
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
      this.userInput.password.hasError('minlength') ? 'The password is too short' :
      this.userInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }
  getErrorMessageName(){
    return this.userInput.name.hasError('required') ? 'You must enter a value' :
    this.userInput.name.hasError('pattern') ? 'The name field should not contains numbers' :
        '';
  }
  getErrorCardNumber(){
    return this.userInput.cardNumber.hasError('required') ? 'You must enter a value' :
      this.userInput.cardNumber.hasError('minlength') ? 'The password is too short' :
      this.userInput.cardNumber.hasError('maxlength') ? 'The password is too long' : '';
  }
  getErrorCardCVC(){
    return this.userInput.cardCVC.hasError('required') ? 'Enter a value' :
      this.userInput.cardCVC.hasError('minlength') ? 'Wrong data' :
      this.userInput.cardCVC.hasError('maxlength') ? 'Wrong data' : '';
  }
  
}
//--------------------------------------------------------------------------------