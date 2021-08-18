import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinProfileComponent } from './coin-profile.component';

describe('CoinProfileComponent', () => {
  let component: CoinProfileComponent;
  let fixture: ComponentFixture<CoinProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
