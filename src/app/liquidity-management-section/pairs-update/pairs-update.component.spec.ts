import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairsUpdateComponent } from './pairs-update.component';

describe('PairsUpdateComponent', () => {
  let component: PairsUpdateComponent;
  let fixture: ComponentFixture<PairsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
