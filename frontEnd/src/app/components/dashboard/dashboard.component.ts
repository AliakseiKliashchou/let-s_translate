import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../app.component.css']
})
export class DashboardComponent implements OnInit {
  translateStatusArray = [
    {title: 'Red Hat', status: {value: 1, display: 'In progress'}, date: '05 jul'},
    {title: 'Chicken', status: {value: 1, display: 'In progress'}, date: '07 jul'},
    {title: 'Gold card', status: {value: 0, display: 'Waiting translator'}, date: '12 jul'},
    {title: 'Brave mouse', status: {value: 3, display: 'Ready for translator review'}, date: '24 aug'},
    {title: 'Sly fox', status: {value: 1, display: 'In progress'}, date: '01 sep'},
    {title: 'Live floor', status: {value: 3, display: 'Ready for customer review'}, date: '01 jul'},
    {title: 'Onion', status: {value: 1, display: 'In progress'}, date: '13 aug'}
  ];


  constructor() {
  }

  ngOnInit() {
  }

  getColor(status) {
    switch (status) {
      case 0:
        return '#DA111A';
      case 1:
        return '#d09515';
      case 2:
      case 3:
        return '#5546E4';
    }
  }


}
