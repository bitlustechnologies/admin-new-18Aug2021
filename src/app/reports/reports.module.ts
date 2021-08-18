import { HttpModule } from '@angular/http';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { BitgoCoinsReportComponent } from './bitgo-coins-report/bitgo-coins-report.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CoinProfileComponent } from './coin-profile/coin-profile.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { BuysellService } from '../services/buysell.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WithdrawHistoryComponent } from './withdraw-history/withdraw-history.component';
import { DepositHistoryComponent } from './deposit-history/deposit-history.component';
import { HttpClientModule } from '@angular/common/http';
import { ExportComponent } from './export/export.component';
import { BalanceDetailsComponent } from './balance-details/balance-details.component';
import { ExternalDepositComponent } from './external-deposit/external-deposit.component';
import {TableModule} from 'primeng/table';
import { ReportsExpoPipe } from './../pipes/reports-expo.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    // ToastrModule.forRoot(),
    FormsModule,
    QRCodeModule,
    NgbModule,
    HttpModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers:[ToastrService,BuysellService, ErrorhandlingService],
  declarations: [BitgoCoinsReportComponent, BalanceReportComponent, CoinProfileComponent, WithdrawHistoryComponent, DepositHistoryComponent, ExportComponent, BalanceDetailsComponent, ExternalDepositComponent,ReportsExpoPipe]
})
export class ReportsModule { }
