import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitgoCoinsReportComponent } from './bitgo-coins-report.component';

describe('BitgoCoinsReportComponent', () => {
  let component: BitgoCoinsReportComponent;
  let fixture: ComponentFixture<BitgoCoinsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitgoCoinsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitgoCoinsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
