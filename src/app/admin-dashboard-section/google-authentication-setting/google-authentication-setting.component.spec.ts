import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticationSettingComponent } from './google-authentication-setting.component';

describe('GoogleAuthenticationSettingComponent', () => {
  let component: GoogleAuthenticationSettingComponent;
  let fixture: ComponentFixture<GoogleAuthenticationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAuthenticationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthenticationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
