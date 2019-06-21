import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router,) { }

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
}
