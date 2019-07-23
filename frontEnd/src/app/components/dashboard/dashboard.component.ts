import {Component, EventEmitter, OnInit, ViewChild, ElementRef} from '@angular/core';
import {OrderService} from '../../_shared/service/order/order.service';
import {OrderInterface} from '../../_shared/interface/order.interface';
import {AuthService} from '../../_shared/service/users/auth.service';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../app.component.css']
})
export class DashboardComponent implements OnInit {
  status = [
    'Waiting translator',
    'In progress',
    'Ready for translator review',
    'Ready for customer review',
    'Complete'
  ];
  filteredTags: Observable<string[]>;
  tagCtrl = new FormControl();
  ordersArray: OrderInterface[];
  role: string;
  tags: string[] = [];
  selectedLng: string;
  allTags: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Science'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) {
  }

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.role = this.authService.getRole();
    if (this.role === 'translator') {
      this.orderService.getUnownedOrders()
        .subscribe((orders: OrderInterface[]) => {
          console.log(orders);
          this.ordersArray = orders;
        });
    } else {
      this.orderService.getOrders()
        .subscribe((orders: OrderInterface[]) => {
          this.ordersArray = orders;
          console.log(this.ordersArray);
        });
    }
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

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

  filter() {
    this.orderService.getFilteredOrder(this.tags)
      .subscribe((orders: OrderInterface[]) => {
        this.ordersArray = orders;
      });
  }

  getColor(status) {
    switch (status) {
      case 0:
        return '#DA111A';
      case 1:
        return '#d09515';
      case 2:
      case 3:
        return '#5546E4';
    }
  }

  anchor(id) {
    this.router.navigate(['/text_details', id], {fragment: 'bottom'});
  }

// ***********************GET ORDER********************************* */

  getOrder(idOrder: number, j) {
    const id = this.authService.getUserId();
    this.orderService.acceptOrder(idOrder, id);
    this.ordersArray.splice(j, 1);
  }


}
