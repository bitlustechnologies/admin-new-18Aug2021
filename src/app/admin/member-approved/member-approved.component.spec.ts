import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApprovedComponent } from './member-approved.component';

describe('MemberApprovedComponent', () => {
  let component: MemberApprovedComponent;
  let fixture: ComponentFixture<MemberApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
