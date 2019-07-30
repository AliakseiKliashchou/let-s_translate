import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {arrayLanguage} from './languages';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  @Input() placeholder: string;
  @Output() selectValue: EventEmitter<any> = new EventEmitter();
  arrayLanguage = arrayLanguage;

  constructor() {
  }

  ngOnInit() {
  }

  getLang(sel) {
    this.selectValue.emit(sel);
  }
}
