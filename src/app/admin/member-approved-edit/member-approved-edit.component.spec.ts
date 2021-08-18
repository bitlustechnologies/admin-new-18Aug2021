import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApprovedEditComponent } from './member-approved-edit.component';

describe('MemberApprovedEditComponent', () => {
  let component: MemberApprovedEditComponent;
  let fixture: ComponentFixture<MemberApprovedEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApprovedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApprovedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
