import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySymbolsComponent } from './currency-symbols.component';

describe('CurrencySymbolsComponent', () => {
  let component: CurrencySymbolsComponent;
  let fixture: ComponentFixture<CurrencySymbolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencySymbolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencySymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
