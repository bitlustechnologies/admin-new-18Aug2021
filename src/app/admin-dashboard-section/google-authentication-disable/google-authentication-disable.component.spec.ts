import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticationDisableComponent } from './google-authentication-disable.component';

describe('GoogleAuthenticationDisableComponent', () => {
  let component: GoogleAuthenticationDisableComponent;
  let fixture: ComponentFixture<GoogleAuthenticationDisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAuthenticationDisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthenticationDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
