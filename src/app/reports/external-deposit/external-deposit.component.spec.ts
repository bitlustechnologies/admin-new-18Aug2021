import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDepositComponent } from './external-deposit.component';

describe('ExternalDepositComponent', () => {
  let component: ExternalDepositComponent;
  let fixture: ComponentFixture<ExternalDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
