import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {OrderService} from '../../_shared/service/order/order.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import {UserInfoService} from '../../_shared/service/users/user-info.service';
import {MatStepperModule} from '@angular/material/stepper';
import {Router} from "@angular/router";


@Component({
  selector: 'app-new-texts',
  templateUrl: './new-texts.component.html',
  styleUrls: ['./new-texts.component.css', '../../app.component.css']
})
export class NewTextsComponent implements OnInit {
  progressBar = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Science'];
  initial = 'initial';
  finite = 'finite';
  isHovering: boolean;
  files: File[] = [];
  maxSize = 20 * (10 ** 6);
  isHasError = {
    size: false,
    format: false
  };
  typeAllowed = ['txt', 'pdf', 'doc', 'docx', 'image'];

  order = {
    name: '',
    email: '',
    initialLng: '',
    finiteLng: '',
    additionalReview: false,
    urgency: 0,
    tags: [],
    url: [],
    title: '',
    idCustomer: this.authService.getUserId()
  };

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  id: any;

  constructor(
    private storage: AngularFireStorage,
    private router: Router,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar,
    private http: OrderService,
    private authService: AuthService,
    private userProfile: UserInfoService,
    private router: Router) {
  }

  ngOnInit() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

  // ******************TAGS***************************

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.tagCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  // *************************************************


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  onFileDrop(event: Event) {
    this.progressBar = true;
    const file = (event.target as HTMLInputElement).files[0];
    if (file.size > this.maxSize) {
      this.isHasError.size = true;
      this._snackBar.open('Size of the document is too large', '', {
        duration: 3000,
      });
    }
    let type = (file.type.split('/')[0] === 'image') ?
      file.type.split('/')[0] : file.name.split('.');
    if (typeof type === 'object') type = type[type.length - 1];
    if (this.typeAllowed.indexOf(type) !== -1) this.files.push(file);
    else {
      this.isHasError.format = true;
      this._snackBar.open('This type doesn\'t fit', '', {
        duration: 3000,
      });
    }
    this.progressBar = false;
  }

  uploadText(text) {
    this.progressBar = true;
    const path = `toTranslate/${Date.now()}_aaaaa1.txt`;
    const ref = this.storage.ref(path);
    ref.putString(text).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(url => {
        this.order.url.push(url);
      });
      this._snackBar.open('The text was successfully uploaded', '', {
        duration: 2000,
      });
    }).catch(error => {
      console.log(error);
    });
    this.progressBar = false;
  }

  getURL(url) {
    this.order.url.push(url);
  }

  // *************Configure object to push on server***************** */

  getInitLng(lng) {
    this.order.initialLng = lng;
  }

  getFinitLng(lng) {
    this.order.finiteLng = lng;
  }

  getTitle(title) {
    this.order.title = title;
  }

  makeOrder(additionalReview, urgency) {
    this.progressBar = true;
    this.order.additionalReview = additionalReview.checked;
    this.order.urgency = urgency.checked;
    this.order.tags = this.tags;
    this.userProfile.getCustomerProfile(this.order.idCustomer).subscribe(
      (res: { name, email }) => {
        this.order.name = res.name;
        this.order.email = res.email;
        this.http.createOrder(this.order).subscribe((data) => {
          this.id = data;
          console.log(this.id.id);
          this.router.navigateByUrl(`/text_details/${this.id.id}`); 
        });
      }
    );
    this.progressBar = false;
  }
}
