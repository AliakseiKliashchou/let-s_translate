import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_shared/service/users/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'app-customer-reg',
  templateUrl: './customer-reg.component.html',
  styleUrls: ['./customer-reg.component.css', '../../app.component.css']
})
export class CustomerRegComponent implements OnInit {
  hide_1 = true;
  hide_2 = true;
  photoStatus = false;
  // userInput: any;
  userInputForm: FormGroup;
  passwordPattern = /^[a-zA-Z]\w{2,14}$/;
  emailPattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  photoUrl: string;
  error = {
    required: 'You must enter a value',
    minlength: 'The value is too short',
    maxlength: 'The value is too long',
    pattern: 'Not a valid'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const tariff = this.route.snapshot.fragment;
    this.userInputForm = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.pattern(this.emailPattern)]),
      name: new FormControl('',
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
      creditCard: new FormControl('',
        [Validators.required, Validators.minLength(16)]),
      tariff: new FormControl(tariff || 'gold',
        [Validators.required]),
      password: new FormControl('',
        [Validators.required, Validators.maxLength(10), Validators.minLength(2), Validators.pattern(this.passwordPattern)]),
      passwordSubmitted: new FormControl('',
        [Validators.required, Validators.maxLength(10), Validators.minLength(2), Validators.pattern(this.passwordPattern)])
    });
  }

  getErrorMessage(control: string) {
    const err = this.userInputForm.get(control).errors;
    const keyOfError = Object.keys(err)[0];
    return this.error[keyOfError];
  }


// ------------------------------Upload photo-----------------------------------------------

  uploadPhoto(event) {
    const file = event.target.files[0];
    const path = `photos/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this._snackBar.open('The document was successfully uploaded', '', {
              duration: 2000,
            });
            this.photoUrl = url;
            this.photoStatus = true;
          });
        }
      )
    ).subscribe();
  }

// ----------------------------CUSTOMER REGISTRATION-------------------------------
  submit() {
    const user = this.userInputForm.value;
    user.role = 'customer';
    user.photo = this.photoUrl;
    this.authService.customerRegistration(user).subscribe((data: any) => {
      this._snackBar.open(
        `${data.message}`,
        '', {
          duration: 2000,
        });
      this.router.navigate(['/']);
    });
  }

// --------------------------------------------------------------------------------

}

