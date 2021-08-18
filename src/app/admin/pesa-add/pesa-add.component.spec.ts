import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesaAddComponent } from './pesa-add.component';

describe('PesaAddComponent', () => {
  let component: PesaAddComponent;
  let fixture: ComponentFixture<PesaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
