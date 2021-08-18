import { ExponentcountPipe } from './../pipes/exponentcount.pipe';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundRoutingModule } from './fund-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawlComponent } from './withdrawl/withdrawl.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TablesModule } from '../table/tables.module';

@NgModule({
  imports: [
    CommonModule,
    FundRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    //  ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    HttpModule,
    HttpClientModule,
    TablesModule
  ],
  providers: [ToastrService, ErrorhandlingService],
  declarations: [DepositComponent, WithdrawlComponent, ExponentcountPipe]
})
export class FundTransactionModule {}
