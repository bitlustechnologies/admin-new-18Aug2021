import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPairsFeeEditComponent } from './currency-pairs-fee-edit.component';

describe('CurrencyPairsFeeEditComponent', () => {
  let component: CurrencyPairsFeeEditComponent;
  let fixture: ComponentFixture<CurrencyPairsFeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyPairsFeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyPairsFeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
