import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../_shared/service/admin/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css', '../../app.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.AdminService.getAdminData().subscribe( (data) => {
      console.log(data);
    });
  }

}
