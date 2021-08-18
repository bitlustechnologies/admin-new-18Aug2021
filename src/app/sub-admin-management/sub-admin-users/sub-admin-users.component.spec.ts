import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminUsersComponent } from './sub-admin-users.component';

describe('SubAdminUsersComponent', () => {
  let component: SubAdminUsersComponent;
  let fixture: ComponentFixture<SubAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
