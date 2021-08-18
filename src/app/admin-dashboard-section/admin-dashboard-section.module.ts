import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GoogleAuthenticationSettingComponent } from './google-authentication-setting/google-authentication-setting.component';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { GoogleAuthenticationDisableComponent } from './google-authentication-disable/google-authentication-disable.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { GoogleService } from '../services/google/google.service';
import { GrowlModule } from 'primeng/growl';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {AdminexpoPipe} from '../pipes/adminexpo.pipe'
@NgModule({
  imports: [
    GrowlModule,
    CommonModule,
    AdminDashboardRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    ChartsModule,
    // ToastrModule.forRoot(),
    FormsModule,
    FileUploadModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  declarations: [AdminDashboardComponent, 
    AdminProfileComponent, ChangePasswordComponent, 
    GoogleAuthenticationSettingComponent,
    GoogleAuthenticationDisableComponent,AdminexpoPipe],
  providers: [ToastrService,GoogleService, ErrorhandlingService]
})
export class AdminDashboardSectionModule { }
