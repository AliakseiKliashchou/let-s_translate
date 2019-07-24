import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoService} from './../../_shared/service/users/user-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css', '../../app.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(
    private UserInfoService: UserInfoService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.newPasswordForm = new FormGroup({
      password_1: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      password_2: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    });
  }
  newPasswordForm : FormGroup;
  error = {
    required: 'You must enter a value',
    minlength: 'The value is too short',
    maxlength: 'The value is too long',
    pattern: 'Not a valid'
  };

getErrorMessage(control: string) {
  console.log(control);
    const err = this.newPasswordForm.get(control).errors;
    console.log(err);
    const keyOfError = Object.keys(err)[0];
    console.log(this.error[keyOfError]);
    return this.error[keyOfError];
  }

  submit(){
    let newPassword = this.newPasswordForm.value.password_1;
    console.log(newPassword);
    this.UserInfoService.changePassword(newPassword).subscribe( (data) => {
      console.log(data);
      this._snackBar.open('The password was successfully changed', '', {
        duration: 2000,
      });
    });
  }





}
