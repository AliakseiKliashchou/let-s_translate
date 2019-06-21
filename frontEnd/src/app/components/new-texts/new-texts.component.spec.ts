import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTextsComponent } from './new-texts.component';

describe('NewTextsComponent', () => {
  let component: NewTextsComponent;
  let fixture: ComponentFixture<NewTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
