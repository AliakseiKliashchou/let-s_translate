import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lng-checkboxes',
  templateUrl: './lng-checkboxes.component.html',
  styleUrls: ['./lng-checkboxes.component.css']
})
export class LngCheckboxesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() LanguageArray: EventEmitter<any> = new EventEmitter();

  getLang(sel) {
    this.LanguageArray.emit(sel);
  }

}
