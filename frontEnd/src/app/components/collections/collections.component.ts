import { Component, OnInit } from '@angular/core';
import { CollectionsService } from './../../_shared/service/collections/collections.service';
import {AuthService} from '././../../_shared/service/users/auth.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css', '../../app.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(
    private CollectionsService: CollectionsService, 
    private AuthService: AuthService
    ) { }

  ngOnInit() {
    let id = this.AuthService.getUserId();
    this.CollectionsService.getCollections(id).subscribe( (data) => {
      console.log(data);
    });
  }



}
