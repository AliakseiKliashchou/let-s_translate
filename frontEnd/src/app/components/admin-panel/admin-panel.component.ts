import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../_shared/service/admin/admin.service';
import { TariffInterface } from './../../_shared/interface/tariff.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css', '../../app.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private _snackBar: MatSnackBar) { }

  silverChangeDis = true;
  goldChangeDis = true;
  platinumChangeDis = true;

  tariffsArray: TariffInterface[] = [];

  ngOnInit() {
    this.AdminService.getAdminData().subscribe( (data: any) => {
      for(let i = 0; i < data.length; i++){
        this.tariffsArray.push(data[i]);
      }
    });   
    console.log(this.tariffsArray);
  }

  changeTariff(name, cost, coins, coeff){
    let tariff = {
      name: name,
      cost: cost,
      coins: coins,
      coeff: coeff
    }
    this.AdminService.changeTariffPlan(tariff).subscribe( (data) => {
      console.log(data);
      this._snackBar.open('The tarriff plan was successfully changed', '', {
        duration: 2000,
      });
    });
  }
  
}
