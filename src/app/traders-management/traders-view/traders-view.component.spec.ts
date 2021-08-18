import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradersViewComponent } from './traders-view.component';

describe('TradersViewComponent', () => {
  let component: TradersViewComponent;
  let fixture: ComponentFixture<TradersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
