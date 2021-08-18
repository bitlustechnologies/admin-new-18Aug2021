import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankViewComponent } from './user-bank-view.component';

describe('UserBankViewComponent', () => {
  let component: UserBankViewComponent;
  let fixture: ComponentFixture<UserBankViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBankViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBankViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
