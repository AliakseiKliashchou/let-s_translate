import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

import {AuthService} from '../../_shared/service/users/auth.service';
import {UserInfoService} from '../../_shared/service/users/user-info.service';

interface UserProfile {
  photo: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  userInput = {
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.maxLength(10), Validators.minLength(2)])
  };
  isRole = {
    auth: false,
    customer: false,
    translator: false
  };
  role = 'customer';
  user = {
    email: '',
    password: '',
    role: ''
  };
  window = {
    isWindowSizeSmall: (window.innerWidth < 1300),
    isClose: true
  };
  userProfile;
  userProfileForm;
  imageUrl;
  photo;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  downPhoto = new Subject();
  error: any;


  constructor(
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.isRole.auth = this.authService.getIsAuth();
    this.authService.getIsAuthStatus().subscribe((isAuth: boolean) => {
      this.isRole.auth = isAuth;
    });
    if (this.isRole.auth) {
      const userId = this.authService.getUserId();
      const role = this.authService.getRole();
      if (role === 'translator') {
        this.isRole.translator = true;
        this.userInfoService.getTranslatorProfile(userId).subscribe(res => console.log(res));
      } else {
        this.userInfoService.getCustomerProfile(userId).subscribe((userData: UserProfile) => {
          this.isRole.customer = true;
          this.userProfile = userData;
          this.imageUrl = userData.photo;
          this.userProfileForm = {
            photo:
              new FormControl(this.imageUrl || ''),
            name:
              new FormControl(userData.name || '', Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')),
            email:
              new FormControl(userData.email, Validators.pattern(this.emailPattern))
          };
        });
      }

    }
  }

  // --------VALIDATION------------------------------

  getErrorMessageEmail() {
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
      this.userInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
      this.userInput.password.hasError('minlength') ? 'The password is too short' :
        this.userInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }

  // --------------------------------------------------

  checkInp(role, value, flag) {
    switch (role) {
      case 'customer':
        if (flag === 'email') {
          this.user.email = value;
          this.user.role = role;
        }
        if (flag === 'password') {
          this.user.password = value;
          this.user.role = role;
        }
        break;

      case 'translator':
        if (flag === 'email') {
          this.user.email = value;
          this.user.role = role;
        }
        if (flag === 'password') {
          this.user.password = value;
          this.user.role = role;
        }
        break;
    }
  }

  login(frame) {
    // frame.hide();
    this.authService.log(this.user).subscribe(() => {
      console.log('Success');
      this.authService.login(this.user);
      frame.hide();
    }, (err) => {
      console.error(err.error.message);
      this.error = err.error.message;
      console.log(this.error);
    });
  }

  logout() {
    this.authService.logout();
    this.userProfile = null;
    this.isRole = {
      auth: false,
      customer: false,
      translator: false
    };
  }

  toggleMenu() {
    this.window.isClose = !this.window.isClose;
  }

  resizeWindow() {
    this.window.isWindowSizeSmall = (window.innerWidth < 1300);
    if (!this.window.isWindowSizeSmall) { this.window.isClose = true; }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userProfileForm.photo.patchValue(file);
    this.userProfileForm.photo.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  updateProfile(frame) {
    this.photo = this.userProfileForm.photo.value;
    const email = this.userProfileForm.email.value;
    const name = this.userProfileForm.name.value;
    if (typeof this.photo !== 'string') {
      const prom = new Promise<string>((res) => {
        res('ok');
      }).then(res => {
        this.uploadPhoto(this.photo);
        return this.downPhoto;
      }).then(res => {
        this.downPhoto.subscribe(() => {
          this.userInfoService.updateUserProfile(this.photo, email, name);
        });
      });
    } else {
      this.userInfoService.updateUserProfile(this.photo, email, name);
    }
    frame.hide();
    this._snackBar.open('Your information was successfully updated', '', {
      duration: 2000,
    });
  }

  private uploadPhoto(file) {
    const path = `photos/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.photo = url;
            this.downPhoto.next(url);
            this._snackBar.open('The document was successfully uploaded', '', {
              duration: 2000,
            });
          });
        }
      )
    ).subscribe();
  }

}
