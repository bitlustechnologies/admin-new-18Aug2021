import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeManagementNewComponent } from './fee-management-new.component';

describe('FeeManagementNewComponent', () => {
  let component: FeeManagementNewComponent;
  let fixture: ComponentFixture<FeeManagementNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeManagementNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeManagementNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
