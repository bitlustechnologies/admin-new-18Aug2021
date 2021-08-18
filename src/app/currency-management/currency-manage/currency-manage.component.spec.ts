import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyManageComponent } from './currency-manage.component';

describe('CurrencyManageComponent', () => {
  let component: CurrencyManageComponent;
  let fixture: ComponentFixture<CurrencyManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
