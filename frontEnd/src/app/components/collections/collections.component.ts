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
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css', '../../app.component.css']
})
export class CollectionsComponent implements OnInit {

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

  constructor(
    private collectionsService: CollectionsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {  }

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  isShowCollections = false;
  progressBar = false;
  collectionsArray: CollectionsInterface[] = [];
  filteredCollections: FilteredCollectionsInterface[] = [];
  headElements = ['', 'Name of customer', 'Title', 'Date', 'Download URL', 'Original language', 'Translate language', 'Email',];
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
    this.collectionsService.getFindingCollections(this.findingParams).subscribe((data: FilteredCollectionsInterface[]) => {
      console.log(data);
      this.filteredCollections = data;
      this.progressBar = false;
    });
  }

  //*****************************DELETE EXISTING COLLECTION****************************************** */
  deleteCollection(id, i){
    this.progressBar = true;
    this.collectionsService.deleteCollection(id).subscribe( (data) => {
      this.collectionsArray.splice(i , 1);
      this._snackBar.open('Collection was successfully deleted', '', {
        duration: 2000,
      });
    });
    this.progressBar = false;
  }

// **************************CHOOSE ITEMS AND CREATE NEW COLLECTION**************************************** */
  newCollectionArray = {
    title: '',
    id: [],
    isOneTranslator: false
  }
  indexArray = [];
  click_check(check, idOrder, i){
    if(check.checked){
      this.newCollectionArray.id[i] = idOrder; 
      this.indexArray.push(i); 
    }
    if (!check.checked) {
      delete this.newCollectionArray.id[i];
      let ind = this.indexArray.indexOf(i);
      this.indexArray.splice(ind, 1);
    } 
  }
  
  createNewCollection(title, isOneTranslator){  
    this.progressBar = true;
    if(isOneTranslator.checked){
     this.newCollectionArray.isOneTranslator = true;
    }else  this.newCollectionArray.isOneTranslator = false;
    this.newCollectionArray.title = title;
    for (let j = 0; j < this.newCollectionArray.id.length; j++) {
      if (this.newCollectionArray.id[j] == undefined) {
        this.newCollectionArray.id.splice(j, 1);
      }
    }
    for(let k = 0; k < this.indexArray.length; k ++){        
      this.filteredCollections.splice(k, 1);          
    }
    this.collectionsService.createColection(this.newCollectionArray.id, this.newCollectionArray.title, this.newCollectionArray.isOneTranslator)
      .subscribe((data) => {
        this.ngOnInit();
        this._snackBar.open('Collection was successfully created', '', {
          duration: 2000,
        });
      });
    this.progressBar = false;
  }


}
