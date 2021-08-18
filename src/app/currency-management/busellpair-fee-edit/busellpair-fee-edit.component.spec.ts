import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusellpairFeeEditComponent } from './busellpair-fee-edit.component';

describe('BusellpairFeeEditComponent', () => {
  let component: BusellpairFeeEditComponent;
  let fixture: ComponentFixture<BusellpairFeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusellpairFeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusellpairFeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
