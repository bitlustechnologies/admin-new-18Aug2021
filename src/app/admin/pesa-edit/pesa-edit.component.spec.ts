import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesaEditComponent } from './pesa-edit.component';

describe('PesaEditComponent', () => {
  let component: PesaEditComponent;
  let fixture: ComponentFixture<PesaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
