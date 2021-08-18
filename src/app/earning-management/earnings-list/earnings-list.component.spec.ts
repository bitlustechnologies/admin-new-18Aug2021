import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsListComponent } from './earnings-list.component';

describe('EarningsListComponent', () => {
  let component: EarningsListComponent;
  let fixture: ComponentFixture<EarningsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
