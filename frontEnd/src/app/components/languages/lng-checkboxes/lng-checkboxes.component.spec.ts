import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LngCheckboxesComponent } from './lng-checkboxes.component';

describe('LngCheckboxesComponent', () => {
  let component: LngCheckboxesComponent;
  let fixture: ComponentFixture<LngCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LngCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LngCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
