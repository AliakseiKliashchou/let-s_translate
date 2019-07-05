import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
@Output () selectValue : EventEmitter<any> = new EventEmitter();
  getLang(sel){
    this.selectValue.emit(sel);
  } 
}
