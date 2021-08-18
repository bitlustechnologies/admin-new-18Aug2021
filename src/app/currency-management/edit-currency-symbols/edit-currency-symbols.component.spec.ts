import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrencySymbolsComponent } from './edit-currency-symbols.component';

describe('EditCurrencySymbolsComponent', () => {
  let component: EditCurrencySymbolsComponent;
  let fixture: ComponentFixture<EditCurrencySymbolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCurrencySymbolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCurrencySymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
