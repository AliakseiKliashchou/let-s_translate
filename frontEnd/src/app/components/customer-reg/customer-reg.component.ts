import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {HttpService} from './../../http.service';



@Component({
  selector: 'app-customer-reg',
  templateUrl: './customer-reg.component.html',
  styleUrls: ['./customer-reg.component.css', '../../app.component.css']
})
export class CustomerRegComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit() {
  }
//----------------Validation---------------------------------------------------
  hide_1 = true;
  hide_2 = true;
  
  userInput = {
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password_1: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    password_2: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
    cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
    tariff: new FormControl('', [Validators.required]),
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
  getErrorCardNumber(){
    return this.userInput.cardNumber.hasError('required') ? 'You must enter a value' :
      this.userInput.cardNumber.hasError('minlength') ? 'The password is too short' :
      this.userInput.cardNumber.hasError('maxlength') ? 'The password is too long' : '';
  } 
  getErrorMessageTariff(){
    return this.userInput.email.hasError('required') ? 'You must select a value' : '';
  }
//--------------------------------------------------------------------------------

//----------------------------CUSTOMER REGISTRATION-------------------------------
submit(name, email, creditCard, password, tariff){
  let user = {
    name: name,
    email: email,
    creditCard: creditCard,
    password: password,
    tariff: tariff
  }
  console.log(user);
  /*this.http.customer_reg(user).subscribe( (data: any) => {
    console.log(data);
  });*/
}
//--------------------------------------------------------------------------------
}

