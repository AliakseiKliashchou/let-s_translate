import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNewTranslatorComponent } from './reg-new-translator.component';

describe('RegNewTranslatorComponent', () => {
  let component: RegNewTranslatorComponent;
  let fixture: ComponentFixture<RegNewTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNewTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNewTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
