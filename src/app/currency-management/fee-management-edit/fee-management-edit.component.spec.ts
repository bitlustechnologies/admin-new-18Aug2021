import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeManagementEditComponent } from './fee-management-edit.component';

describe('FeeManagementEditComponent', () => {
  let component: FeeManagementEditComponent;
  let fixture: ComponentFixture<FeeManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
