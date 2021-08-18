import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPairsComponent } from './currency-pairs.component';

describe('CurrencyPairsComponent', () => {
  let component: CurrencyPairsComponent;
  let fixture: ComponentFixture<CurrencyPairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyPairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
