import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../_shared/service/order/order.service';
import { OrderInterface } from '../../_shared/interface/order.interface';
import { AuthService } from '../../_shared/service/users/auth.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../app.component.css']
})


export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'date', 'price', 'lastComment'];
  dataSource: MatTableDataSource<any>;

  progressBar = false;
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
  allTags: string[] = ['Architecture', 'Music', 'Art', 'Technical', 'Food', 'Travels', 'Fashion', 'Science'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  label: string;
  customerComplitedArray: any;
  customerInComplitedArray: OrderInterface[];
  translatorInComplitedArray: OrderInterface[];
  translatorComplitedArray: any[];
  index = 0;
  collectionsTranslatorArray: OrderInterface[];
  indexOfPage = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  // ngAfterViewInit() {    
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.sortingDataAccessor = (data, header) => data[header];
  // }

  ngOnInit() {
    this.progressBar = true;
    this.role = this.authService.getRole();
    if (this.role === 'translator') {
      this.displayedColumns = ['title', 'tags', 'options', 'date', 'price', 'lastComment'];
      this.orderService.getUnownedOrders()
        .subscribe((orders: OrderInterface[]) => {
          this.ordersArray = orders;

          this.collectionsTranslatorArray = orders.filter(colls => colls.idOrders);
          console.log(this.collectionsTranslatorArray);

          this.translatorInComplitedArray = orders.filter((order) => {
            if (order.status === 0 && !order.idOrders) {
              return order;
            }
          });

          this.translatorComplitedArray = orders.filter((order) => {
            if (order.status === 2) {
              return order;
            }
          });

          this.dataSource = new MatTableDataSource(this.translatorInComplitedArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    } else if (this.role === 'customer') {
      this.orderService.getOrders()
        .subscribe((orders: OrderInterface[]) => {
          this.ordersArray = orders;
          this.customerComplitedArray = orders.filter((order) => {
            if (order.status === 4) {
              return order;
            }
          });
          this.customerInComplitedArray = orders.filter((order) => {
            if (order.status !== 4) {
              return order;
            }
          });
          this.dataSource = new MatTableDataSource(this.customerInComplitedArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (data, header) => data[header];
          console.log(this.ordersArray);
        });
    }
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
    this.progressBar = false;
  }
  dataSettings() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, header) => data[header];
  }
  onTabClick(e) {
    this.indexOfPage = e.index;
    if (e.index === 1 && this.role === 'customer') {
      this.dataSource = new MatTableDataSource(this.customerComplitedArray);
      this.dataSettings()
    } else if (e.index === 0 && this.role === 'customer') {
      this.dataSource = new MatTableDataSource(this.customerInComplitedArray);
      this.dataSettings()
    } else if (e.index === 2 && this.role === 'translator') {
      this.dataSource = new MatTableDataSource(this.translatorComplitedArray);
      this.dataSettings()
    } else if (e.index === 1 && this.role === 'translator') {
      this.dataSource = new MatTableDataSource(this.translatorInComplitedArray);
      this.dataSettings()
    }
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
    this.allTags.unshift(fruit);
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit1: string | null) => fruit1 ? this._filter(fruit1) : this.allTags.slice()));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option);
    const i = this.allTags.indexOf(event.option.viewValue);
    this.allTags.splice(i, 1);
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  filter() {
    this.progressBar = true;
    this.orderService.getFilteredOrder(this.tags)
      .subscribe((orders: OrderInterface[]) => {
        this.ordersArray = orders;
        console.log(orders);

        this.collectionsTranslatorArray = orders.filter(colls => colls.idOrders);

        this.translatorInComplitedArray = orders.filter((order) => {
          if (order.status === 0 && !order.idOrders) {
            return order;
          }
        });

        this.translatorComplitedArray = orders.filter((order) => {
          if (order.status === 2) {
            return order;
          }
        });
        switch (this.indexOfPage) {
          case 0:
            this.dataSource = new MatTableDataSource(this.collectionsTranslatorArray);
            break;
          case 1:
            this.dataSource = new MatTableDataSource(this.translatorInComplitedArray);
            break;
          case 2:
            this.dataSource = new MatTableDataSource(this.translatorComplitedArray);
            break;
        }
        this.dataSettings()
      });
    this.progressBar = false;
  }

  // ***********************GET ORDER********************************* */

  getOrder(idOrder: number, index, isColl) {
    this.progressBar = true;
    const idTranslators = this.authService.getUserId();
    this.orderService.acceptOrder(idOrder, idTranslators, isColl)
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(this.translatorInComplitedArray);
        this.dataSettings();
      });
    if (isColl) { this.collectionsTranslatorArray.splice(index, 1); } else { this.translatorInComplitedArray.splice(index, 1); }
    this.dataSource = new MatTableDataSource(this.translatorInComplitedArray);

    this.progressBar = false;
  }

}
