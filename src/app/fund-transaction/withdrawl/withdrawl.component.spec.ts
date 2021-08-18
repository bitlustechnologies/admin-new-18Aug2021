import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlComponent } from './withdrawl.component';

describe('WithdrawlComponent', () => {
  let component: WithdrawlComponent;
  let fixture: ComponentFixture<WithdrawlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
