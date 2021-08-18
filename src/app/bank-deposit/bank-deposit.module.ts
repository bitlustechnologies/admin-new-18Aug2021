import { BankdepositExponentPipe } from './../pipes/bankdeposit-exponent.pipe';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDepositRoutingModule } from './bank-deposit-routing.module';
import { ListComponent } from './list/list.component';
import { PendingComponent } from './pending/pending.component';
import { ApprovedComponent } from './approved/approved.component';
import { GrowlModule } from 'primeng/growl';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { TablesRoutes } from '../table/tables.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TablesModule } from '../table/tables.module';

@NgModule({
  declarations: [ListComponent, PendingComponent, ApprovedComponent, BankdepositExponentPipe],
  imports: [
    GrowlModule,
    FormsModule,
    CommonModule,
    BankDepositRoutingModule,
    // ToastrModule.forRoot(),
    RouterModule.forChild(TablesRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    NgbModule,
    HttpModule,
    HttpClientModule,
    TablesModule
  ],
  providers: [ErrorhandlingService, ToastrService]
})
export class BankDepositModule {}
