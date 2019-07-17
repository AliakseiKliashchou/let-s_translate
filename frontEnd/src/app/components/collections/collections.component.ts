import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CollectionsService} from './../../_shared/service/collections/collections.service';
import {AuthService} from '././../../_shared/service/users/auth.service';
import {CollectionsInterface} from '../../_shared/interface/collections.interface';
import { FilteredCollectionsInterface } from '../../_shared/interface/filteredCollections.interface';
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

  constructor(
    private CollectionsService: CollectionsService,
    private AuthService: AuthService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {
    this.progressBar = true;
    let id = this.AuthService.getUserId();
    this.CollectionsService.getCollections(id).subscribe((data: CollectionsInterface[]) => {
      this.collectionsArray = data;
      console.log(this.collectionsArray);
      this.progressBar = false;
    });
  }

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
  //************************************TAGS************************* */
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Sience'];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

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

  //****************************************************************** */

  getInitLng(lng) {
    this.findingParams.originalLanguage = lng;
  }

  getFinitLng(lng) {
    this.findingParams.translateLanguage = lng;
  }

  findingParams = {
    originalLanguage: '%%',
    translateLanguage: '%%',
    tags: this.tags,
    review: false
  };

  findOrders(review) {
    this.progressBar = true;
    if (review.checked) {
      this.findingParams.review = true;
    }
    this.CollectionsService.getFindingCollections(this.findingParams).subscribe((data: FilteredCollectionsInterface[]) => {
      this.filteredCollections = data;
      console.log(this.filteredCollections);
      this.progressBar = false;
    });
  }

//**************************CHOOSE ITEMS AND CREATE NEW COLLECTION**************************************** */
newCollectionArray = {
  title: '',
  id: []
}
  click_check(check, id, i){
    check._checked = !check._checked; 
    if(check.checked){
      this.newCollectionArray.id.splice(i , 0 , id);  
      console.log(this.newCollectionArray.id);   
    }
    if(!check.checked){
      this.newCollectionArray.id.splice(i , 1);  
      console.log(this.newCollectionArray.id);       
    } 
    
  }

}
