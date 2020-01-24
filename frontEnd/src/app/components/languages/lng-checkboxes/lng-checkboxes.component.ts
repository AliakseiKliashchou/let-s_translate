import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {arrayLanguage} from '../languages';

@Component({
  selector: 'app-lng-checkboxes',
  templateUrl: './lng-checkboxes.component.html',
  styleUrls: ['./lng-checkboxes.component.css']
})
export class LngCheckboxesComponent implements OnInit {
  arrayLanguage = arrayLanguage;
  @Output() LanguageArray: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }


  getLang(sel) {
    this.LanguageArray.emit(sel);
  }

}
