import { Title } from '@angular/platform-browser';
import { ToastrComponent } from './../extra-component/toastr/toastr.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../services/auth-gaurd.service';
import { UserService } from '../services/user.service';
import { AuthenticationRoutes } from './authentication.routing';
import { MessageService } from 'primeng/components/common/messageservice';
import {GrowlModule} from 'primeng/growl';
import { GoogleComponent } from './google/google.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [GrowlModule,FormsModule,CommonModule,
     RouterModule.forChild(AuthenticationRoutes),
     NgbModule,
    //  ToastrModule.forRoot(),
     NgxLoadingModule.forRoot({})
    ],
  declarations: [NotFoundComponent, LoginComponent, SignupComponent, LockComponent, Signup2Component, GoogleComponent],
  providers: [MessageService,ToastrService, Title],
})
export class AuthenticationModule {}
