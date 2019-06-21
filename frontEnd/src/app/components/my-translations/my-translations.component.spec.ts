import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTranslationsComponent } from './my-translations.component';

describe('MyTranslationsComponent', () => {
  let component: MyTranslationsComponent;
  let fixture: ComponentFixture<MyTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
