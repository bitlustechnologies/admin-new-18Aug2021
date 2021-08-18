import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningWithdrawComponent } from './earning-withdraw.component';

describe('EarningWithdrawComponent', () => {
  let component: EarningWithdrawComponent;
  let fixture: ComponentFixture<EarningWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
