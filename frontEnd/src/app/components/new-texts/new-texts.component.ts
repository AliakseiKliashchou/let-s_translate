import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {Angular2Txt} from 'angular2-txt/Angular2-txt';
import {MatSnackBar} from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-new-texts',
  templateUrl: './new-texts.component.html',
  styleUrls: ['./new-texts.component.css', '../../app.component.css']
})
export class NewTextsComponent implements OnInit {

  // ******************TAGS***************************
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Sience'];

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.fruitCtrl.setValue(null);
    }
    console.log(this.fruits);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
    console.log(this.fruits);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    console.log(this.fruits);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  // *************************************************


  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  isHovering: boolean;
  files: File[] = [];
  maxSize = 20 * (10 ** 6);
  isHasError = {
    size: false,
    format: false
  };
  typeAllowed = ['txt', 'pdf', 'doc', 'docx', 'image'];

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  onFileDrop(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.size > this.maxSize) {
      this.isHasError.size = true;
      this._snackBar.open('Size of the document is too large', '', {
        duration: 2000,
      });
    }
    let type = (file.type.split('/')[0] === 'image') ?
      file.type.split('/')[0] : file.name.split('.');
    if (typeof type === 'object') type = type[type.length - 1];
    if (this.typeAllowed.indexOf(type) !== -1) this.files.push(file);
    else this.isHasError.format = true;
  }

  uploadText(text) {
    console.log(text);
    var metadata = {
      contentType: 'image/jpeg',
    };

    const path = `toTranslate/${Date.now()}_aaaaa1.txt`;
    const ref = this.storage.ref(path);
    //let txt = new Angular2Txt(text, 'My Report');
    // this.task = this.storage.upload(path, new Angular2Txt(text, 'My Report'));
    ref.putString(text).then((snapshot) => {
      this._snackBar.open('The text was successfully uploaded', '', {
        duration: 2000,
      });
    }).catch(error => {
    });

  }

}
