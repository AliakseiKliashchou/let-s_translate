import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoService} from '../../_shared/service/users/user-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css', '../../app.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  error = {
    required: 'You must enter a value',
    minlength: 'The value is too short',
    maxlength: 'The value is too long',
    pattern: 'Not a valid'
  };

  constructor(
    private userInfoService: UserInfoService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.newPasswordForm = new FormGroup({
      password_1: new FormControl('',
        [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      password_2: new FormControl('',
        [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    });
  }

  getErrorMessage(control: string) {
    const err = this.newPasswordForm.get(control).errors;
    const keyOfError = Object.keys(err)[0];
    return this.error[keyOfError];
  }

  submit() {
    const newPassword = this.newPasswordForm.value.password_1;
    const email = this.route.snapshot.params.email;
    this.userInfoService.changePassword(newPassword, email).subscribe((data) => {
      this._snackBar.open('The password was successfully changed', '', {
        duration: 2000,
      });
      this.router.navigate(['/']);
    });
  }


}
