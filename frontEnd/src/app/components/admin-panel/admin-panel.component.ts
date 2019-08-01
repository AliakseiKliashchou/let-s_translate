import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {AdminService} from '../../_shared/service/admin/admin.service';
import {TariffInterface} from '../../_shared/interface/tariff.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css', '../../app.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private _snackBar: MatSnackBar) {
  }

  hide = [false, false, false];
  tariffArray: FormGroup = new FormGroup({
    items: new FormArray([])
  });

  ngOnInit() {
    this.adminService.getTariffs().subscribe((data: []) => {
      data.forEach((el: TariffInterface) => {
        (this.tariffArray.get('items') as FormArray).push(
          new FormGroup({
            name: new FormControl(el.name),
            cost: new FormControl(el.cost),
            coins: new FormControl(el.coins),
            coeff: new FormControl(el.coeff)
          })
        );
        this.tariffArray.disable();
      });
    });
  }

  changeTariff(tariff) {
    const tariffData = tariff.value;
    this.adminService.changeTariffPlan(tariffData).subscribe((data) => {
      tariff.disable();
      this._snackBar.open('The tariff plan was successfully changed', '', {
        duration: 2000,
      });
    });
  }

  disabled(tariff) {
    tariff.enable();
  }

}
