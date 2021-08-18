import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankEditComponent } from './user-bank-edit.component';

describe('UserBankEditComponent', () => {
  let component: UserBankEditComponent;
  let fixture: ComponentFixture<UserBankEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBankEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBankEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
