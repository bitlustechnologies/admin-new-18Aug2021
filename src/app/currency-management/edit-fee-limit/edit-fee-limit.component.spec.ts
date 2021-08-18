import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeeLimitComponent } from './edit-fee-limit.component';

describe('EditFeeLimitComponent', () => {
  let component: EditFeeLimitComponent;
  let fixture: ComponentFixture<EditFeeLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeeLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeeLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
