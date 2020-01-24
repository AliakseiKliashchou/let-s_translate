import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import {CollectionsService} from '../../_shared/service/collections/collections.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import {CollectionsInterface} from '../../_shared/interface/collections.interface';
import {FilteredCollectionsInterface} from '../../_shared/interface/filteredCollections.interface';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css', '../../app.component.css']
})
export class CollectionsComponent implements OnInit {

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  initial = 'initial';
  finite = 'finite';
  isShowCollections = false;
  progressBar = false;
  collectionsArray: CollectionsInterface[] = [];
  filteredCollections: FilteredCollectionsInterface[] = [];
  headElements = ['', 'Name of customer', 'Title', 'Date', 'Download URL', 'Original language', 'Translate language', 'Email'];

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Science'];

  findingParams = {
    originalLanguage: '',
    translateLanguage: '',
    tags: this.tags,
    review: false
  };
  ordersToCollectionTags = {};
  ordersToCollection = {};
  indexArray = [];


  constructor(
    private collectionsService: CollectionsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    this.progressBar = true;
    const id = this.authService.getUserId();
    this.collectionsService.getCollections(id).subscribe((data: CollectionsInterface[]) => {
      this.collectionsArray = data;
      this.progressBar = false;
    });
  }

  // ************************************TAGS************************* */

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

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  // ****************************************************************** */
  getInitLng(lng) {
    this.findingParams.originalLanguage = lng;
  }

  getFinitLng(lng) {
    this.findingParams.translateLanguage = lng;
  }

  findOrders(review) {
    this.progressBar = true;
    this.findingParams.review = !!review.checked;
    this.collectionsService.getFindingCollections(this.findingParams)
      .subscribe((data: FilteredCollectionsInterface[]) => {
        this.filteredCollections = data;
        this.progressBar = false;
      });
  }

  // *****************************DELETE EXISTING COLLECTION****************************************** */
  deleteCollection(id, i) {
    this.progressBar = true;
    this.collectionsService.deleteCollection(id).subscribe(() => {
      this.collectionsArray.splice(i, 1);
      this._snackBar.open('Collection was successfully deleted', '', {
        duration: 2000,
      });
    });
    this.progressBar = false;
  }

// **************************CHOOSE ITEMS AND CREATE NEW COLLECTION**************************************** */
  click_check(check, idOrder, i, tags) {
    if (check.checked) {
      this.ordersToCollection[i] = idOrder;
      this.ordersToCollectionTags[i] = tags;
      this.indexArray.push(i);
    }
    if (!check.checked) {
      delete this.ordersToCollection[i];
      delete this.ordersToCollectionTags[i];
      const ind = this.indexArray.indexOf(i);
      this.indexArray.splice(ind, 1);
    }
  }

  createNewCollection(title, isOneTranslatorChecked) {
    const titleName = title.value;
    let tagsArray = [];
    const ordersIdArray = [];
    const isOneTranslator = (isOneTranslatorChecked.checked);
    this.progressBar = true;
    for (const key in this.ordersToCollectionTags) {
      tagsArray.push(this.ordersToCollectionTags[key]);
    }
    for (const key in this.ordersToCollection) {
      ordersIdArray.push(this.ordersToCollection[key]);
    }
    tagsArray = tagsArray[0].concat(...tagsArray);
    const uniqTags = new Set(tagsArray);
    const lng = [this.findingParams.originalLanguage, this.findingParams.translateLanguage];

    this.collectionsService.createCollection(ordersIdArray, titleName, isOneTranslator, lng, uniqTags)
      .subscribe((data) => {
        this.ngOnInit();
        this._snackBar.open('Collection was successfully created', '', {
          duration: 2000,
        });
        title.value = '';
        const tempOrdersOfCollections = Object.assign({}, this.filteredCollections);
        const newArrayForCollections = [];
        this.indexArray.forEach(el => {
          delete tempOrdersOfCollections[el];
        });
        for (let key in tempOrdersOfCollections) {
          newArrayForCollections.push(tempOrdersOfCollections[key]);
        }
        this.filteredCollections = newArrayForCollections;
        this.ordersToCollection = {};
        this.ordersToCollectionTags = {};
      });
    this.progressBar = false;
  }


}
