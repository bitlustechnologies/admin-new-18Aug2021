import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionFeesComponent } from './commission-fees.component';

describe('CommissionFeesComponent', () => {
  let component: CommissionFeesComponent;
  let fixture: ComponentFixture<CommissionFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
