import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  //---------navigation-----------------------
  navigate_home(){
    this._router.navigate(['/']);
  }
  navigate_dashboard(){
    this._router.navigate(['dashboard']);
  }
  navigate_newTexts(){
    this._router.navigate(['new_texts']);
  }
  navigate_myTranslations(){
    this._router.navigate(['my_translations']);
  }
  navigate_messages(){
    this._router.navigate(['messages']);
  }
  //----------------------------------------------

  //--------VALIDATION------------------------------
  userInput = {    
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)])
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
  //--------------------------------------------------

  
 
}
