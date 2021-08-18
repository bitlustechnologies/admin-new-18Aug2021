import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminNewComponent } from './sub-admin-new.component';

describe('SubAdminNewComponent', () => {
  let component: SubAdminNewComponent;
  let fixture: ComponentFixture<SubAdminNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
