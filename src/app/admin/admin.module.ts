import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SmarttableComponent } from './../table/smart-table/smart-table.component';
import { BasicComponent } from './../table/basic/basic.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutes } from './../table/tables.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MemberComponent } from './member/member.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { KycComponent } from './kyc/kyc.component';
import { ApprovedComponent } from './approved/approved.component';
import { MemberApprovedComponent } from './member-approved/member-approved.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TradersListComponent } from './traders-list/traders-list.component';
import { TradersViewComponent } from './traders-view/traders-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberApprovedEditComponent } from './member-approved-edit/member-approved-edit.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
// import { UserOverviewComponent } from './user-overview/user-overview.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BanksComponent } from './banks/banks.component';
import { BankAddComponent } from './bank-add/bank-add.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BankEditComponent } from './bank-edit/bank-edit.component';
import { PesaAddComponent } from './pesa-add/pesa-add.component';
import { PesaEditComponent } from './pesa-edit/pesa-edit.component';
import { TablesModule } from '../table/tables.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserBankDetailsComponent } from './user-bank-details/user-bank-details.component';
import { UserBankEditComponent } from './user-bank-edit/user-bank-edit.component';
import { UserBankViewComponent } from './user-bank-view/user-bank-view.component';

@NgModule({
  imports: [
    GrowlModule,
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    // ToastrModule.forRoot(),
    RouterModule.forChild(TablesRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    NgbModule,
    HttpModule,
    HttpClientModule,
    RadioButtonModule,
    TablesModule
  ],
  providers: [MessageService, ToastrService, NgbActiveModal, ErrorhandlingService],
  declarations: [
    MemberComponent,
    KycComponent,
    ApprovedComponent,
    MemberApprovedComponent,
    TradersListComponent,
    TradersViewComponent,
    MemberApprovedEditComponent,
    ActivityLogComponent,
    // UserOverviewComponent,
    BanksComponent,
    BankAddComponent,
    BankEditComponent,
    PesaAddComponent,
    PesaEditComponent,
    NotificationsComponent,
    UserBankDetailsComponent,
    UserBankEditComponent,
    UserBankViewComponent
  ]
})
export class AdminModule {}
