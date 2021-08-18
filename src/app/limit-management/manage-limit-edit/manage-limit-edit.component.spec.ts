import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLimitEditComponent } from './manage-limit-edit.component';

describe('ManageLimitEditComponent', () => {
  let component: ManageLimitEditComponent;
  let fixture: ComponentFixture<ManageLimitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLimitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLimitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
