import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {Observable, Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

import {AuthService} from '../../_shared/service/users/auth.service';
import {UserInfoService} from '../../_shared/service/users/user-info.service';
import {OrderService} from '../../_shared/service/order/order.service';
import {NotificationService} from 'src/app/_shared/service/users/notification.service';
import {AdminService} from '../../_shared/service/admin/admin.service';

interface UserProfileInterface {
  photo: string;
  role: string;
  name: string;
  email: string;
  coins: number;
  tariff: string;
}

interface TariffsInterface {
  name: string;
  coeff: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  progressBar = false;
  namePattern = '[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?';
  // tslint:disable-next-line:max-line-length
  emailPattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  customerInput = {
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    recoverEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
  };

  translatorInput = {
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
  };

  isRole = {
    auth: false,
    customer: false,
    translator: false,
    admin: false
  };

  role = 'customer';
  user = {
    email: '',
    password: '',
    role: 'customer'
  };
  tariffs = {};
  userProfile: UserProfileInterface;
  userProfileForm;
  imageUrl;
  photo;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  downPhoto = new Subject();
  error: any;
  msgCounter: number;


  isShowRecoverPanel = false;


  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private orderService: OrderService,
    private adminService: AdminService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private router: Router,
    private ntfService: NotificationService) {

    this.subscription = this.ntfService.getMessage().subscribe(message => {
      this.msgCounter = message;
    });


    this.isRole.auth = this.authService.getIsAuth();
    this.authService.getIsAuthStatus().subscribe((isAuth: boolean) => {
      this.isRole.auth = isAuth;
      if (this.isRole.auth) {
        const userId = this.authService.getUserId();
        const role = this.authService.getRole();
        if (role === 'translator') {
          this.isRole.translator = true;
          this.userInfoService.getTranslatorProfile(userId)
            .subscribe((res: any) => {
            });
        } else if (role === 'customer') {
          this.ntfService.getNotifications()
            .subscribe((res: any) => {
              this.msgCounter = res.length;
            });
          this.userInfoService.getCustomerProfile(userId)
            .subscribe((userData: UserProfileInterface) => {

              this.adminService.getTariffs().subscribe((tariffs: TariffsInterface[]) => {
                  tariffs.forEach(el => {
                    const name = el.name;
                    this.tariffs[name] = (2 - el.coeff) * 100;
                  });
                }
              );
              this.isRole.customer = true;
              this.userProfile = userData;
              this.imageUrl = userData.photo;
              this.userProfileForm = {
                photo:
                  new FormControl(this.imageUrl || ''),
                name:
                  new FormControl(userData.name || '', Validators.pattern(this.namePattern)),
                email:
                  new FormControl(userData.email, Validators.pattern(this.emailPattern))
              };
            });
        } else if (role === 'admin') this.isRole.admin = true;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // нужно отписаться чтобы не выгружать память
    this.subscription.unsubscribe();
  }

  // --------VALIDATION------------------------------

  getErrorMessageEmailCustomer() {
    return this.customerInput.email.hasError('required') ? 'You must enter a value' :
      this.customerInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getErrorMessageEmailTranslator() {
    return this.translatorInput.email.hasError('required') ? 'You must enter a value' :
      this.translatorInput.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getErrorMessagePasswordCustomer() {
    return this.customerInput.password.hasError('required') ? 'You must enter a value' :
      this.customerInput.password.hasError('minlength') ? 'The password is too short' :
        this.customerInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }

  getErrorMessagePasswordTranslator() {
    return this.translatorInput.password.hasError('required') ? 'You must enter a value' :
      this.translatorInput.password.hasError('minlength') ? 'The password is too short' :
        this.translatorInput.password.hasError('maxlength') ? 'The password is too long' : '';
  }

  getRecoverEmailMessage() {
    return this.customerInput.recoverEmail.hasError('required') ? 'You must enter a value' :
      this.customerInput.recoverEmail.hasError('pattern') ? 'Not a valid email' : '';
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

  addMoney(money) {
    this.progressBar = true;
    if (money) this.userInfoService.addMoney(money)
      .subscribe((res: { msg: string; resultMoney: number }) => {
        this.userProfile.coins = res.resultMoney;
        this._snackBar.open('You get more coins!', '', {
          duration: 2000,
        });
      });
    this.progressBar = false;
  }

  getNewMoney(money, newMoneyInput) {
    const tariff = this.userProfile.tariff
    const internalMoney = money * this.tariffs[tariff];
    newMoneyInput.value = internalMoney;
  }

  login(frame) {
    this.progressBar = true;
    if (this.user.role === 'customer') {
      if ((this.customerInput.email.valid || this.customerInput.email.value === 'admin') && this.customerInput.password.valid) {
        this.authService.log(this.user).subscribe(() => {
          console.log('Success');
          this.authService.login(this.user);
          this.ngOnInit();
          frame.hide();
          this.customerInput.password.reset();
          this.customerInput.email.reset();
          this.translatorInput.password.reset();
          this.translatorInput.email.reset();
          this.progressBar = false;
        }, (err) => {
          this.error = err.error.message;
          this.progressBar = false;
        });
      } else {
        this.error = 'Invalid login or password';
        this.progressBar = false;
      }
    } else if (this.user.role === 'translator') {
      if ((this.translatorInput.email.valid || this.translatorInput.email.value === 'admin') && this.translatorInput.password.valid) {
        this.authService.log(this.user).subscribe(() => {
          console.log('Success');
          this.authService.login(this.user);
          this.ngOnInit();
          frame.hide();
          this.customerInput.password.reset();
          this.customerInput.email.reset();
          this.translatorInput.password.reset();
          this.translatorInput.email.reset();
          this.progressBar = false;
        }, (err) => {
          this.error = err.error.message;
          this.progressBar = false;
        });
      } else {
        this.error = 'Invalid login or password';
        this.progressBar = false;
      }
    }
    // if ((this.userInput.email.valid || this.userInput.email.value === 'admin') && this.userInput.password.valid) {
    //   this.authService.log(this.user).subscribe(() => {
    //     console.log('Success');
    //     this.authService.login(this.user);
    //     this.ngOnInit();
    //     frame.hide();
    //     this.userInput.password.reset();
    //     this.userInput.email.reset();
    //     this.progressBar = false;
    //   }, (err) => {
    //     this.error = err.error.message;
    //     console.log(this.error);
    //     this.progressBar = false;
    //   });
    // } else {
    //   this.error = 'Invalid login or password';
    //   this.progressBar = false;
    // }

  }

  logout() {
    this.authService.logout();
    this.userProfile = null;
    this.isRole = {
      auth: false,
      customer: false,
      translator: false,
      admin: false
    };
    this.error = '';

  }

  onImagePicked(event: Event) {
    this.progressBar = true;
    const file = (event.target as HTMLInputElement).files[0];
    this.userProfileForm.photo.patchValue(file);
    this.userProfileForm.photo.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
    this.progressBar = false;
  }

  updateProfile(frame) {
    this.progressBar = true;
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
    this.progressBar = false;
  }

  private uploadPhoto(file) {
    this.progressBar = true;
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
    this.progressBar = false;
  }

  sendNewOptions(frame) {
    this.progressBar = true;
    const recoverEmail = this.customerInput.recoverEmail.value;
    this.authService.sendPasswordChange(recoverEmail).subscribe((data) => {
      console.log(data);
      this._snackBar.open('On your e-mail adress was send a recovery options', '', {
        duration: 2000,
      });
      frame.hide();
    });
    this.progressBar = false;
  }

  tabs(event) {
    if (event.index === 0) {
      this.user.role = 'customer';
    } else if (event.index === 1) {
      this.user.role = 'translator';
    }
    console.log(event.index);
  }

}
