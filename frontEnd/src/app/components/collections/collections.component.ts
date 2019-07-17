import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CollectionsService} from '../../_shared/service/collections/collections.service';
import {AuthService} from '../../_shared/service/users/auth.service';
import {CollectionsInterface} from '../../_shared/interface/collections.interface';
import {FilteredCollectionsInterface} from '../../_shared/interface/filteredCollections.interface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css', '../../app.component.css']
})
export class CollectionsComponent implements OnInit {
  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  isShowCollections = false;
  progressBar = false;
  collectionsArray: CollectionsInterface[] = [];
  filteredCollections: FilteredCollectionsInterface[] = [];
  headElements = [
    '',
    'Name of customer',
    'Title',
    'Date',
    'Download URL',
    'Original language',
    'Translate language',
    'Email',
  ];
  // ************************************TAGS************************* */
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Science'];

  findingParams = {
    originalLanguage: '%%',
    translateLanguage: '%%',
    tags: this.tags,
    review: false
  };

  constructor(
    private collectionsService: CollectionsService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    this.progressBar = true;
    const id = this.authService.getUserId();
    this.collectionsService.getCollections(id).subscribe((data: CollectionsInterface[]) => {
      this.collectionsArray = data;
      console.log(this.collectionsArray);
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
    if (review.checked) {
      this.findingParams.review = true;
    } else this.findingParams.review = false;
    this.collectionsService.getFindingCollections(this.findingParams).subscribe((data: FilteredCollectionsInterface[]) => {
      this.filteredCollections = data;
      console.log(this.filteredCollections);
      this.progressBar = false;

    });
  }

// **************************CHOOSE ITEMS AND CREATE NEW COLLECTION**************************************** */
  newCollectionArray = {
    title: '',
    id: []
  };

  click_check(check, idOrder, i) {
    if (check.checked) {
      this.newCollectionArray.id[i] = idOrder;
    }
    if (!check.checked) {
      delete this.newCollectionArray.id[i];
    }

  }

  createNewCollection(title) {
    this.newCollectionArray.title = title;
    for (let j = 0; j < this.newCollectionArray.id.length; j++) {
      if (this.newCollectionArray.id[j] == undefined) {
        this.newCollectionArray.id.splice(j, 1);
      }
    }
    this.collectionsService.createColection(this.newCollectionArray.id, this.newCollectionArray.title)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
  }


}
