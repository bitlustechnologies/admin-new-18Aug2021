import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusellpairComponent } from './busellpair.component';

describe('BusellpairComponent', () => {
  let component: BusellpairComponent;
  let fixture: ComponentFixture<BusellpairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusellpairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusellpairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
