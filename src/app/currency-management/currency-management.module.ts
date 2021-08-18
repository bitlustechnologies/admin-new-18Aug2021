import { FivedecimaldirectiveDirective } from './../shared/common-directive/fivedecimaldirective.directive';
import { CurrencySymbolsComponent } from './currency-symbols/currency-symbols.component';
import { EditCurrencySymbolsComponent } from './edit-currency-symbols/edit-currency-symbols.component';
import { CurrencyExponentPipe } from './../pipes/currency-exponent.pipe';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { CurrencySummaryComponent } from './currency-summary/currency-summary.component';
import { BusellpairFeeEditComponent } from './busellpair-fee-edit/busellpair-fee-edit.component';
import { BusellpairComponent } from './busellpair/busellpair.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyManageComponent } from './currency-manage/currency-manage.component';
import { CurrencyManagementRoutingModule } from './currency-management-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { CurrencyPairsComponent } from './currency-pairs/currency-pairs.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { FeeManagementNewComponent } from './fee-management-new/fee-management-new.component';
import { FeeManagementEditComponent } from './fee-management-edit/fee-management-edit.component';
import { EditFeeLimitComponent } from './edit-fee-limit/edit-fee-limit.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CurrencyPairsFeeEditComponent } from './currency-pairs-fee-edit/currency-pairs-fee-edit.component';
import { TwoDecimalDirectiveDirective } from '../shared/common-directive/two-decimal-directive.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPairsComponent } from './currency-pairs/currency-pairs.component';

@NgModule({
  imports: [
    CommonModule,
    CurrencyManagementRoutingModule,
    NgxDatatableModule,
    NgxPaginationModule,
    Ng2SmartTableModule,
    NgbModule,
    FormsModule,
    // ToastrModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  providers: [ToastrService, ErrorhandlingService],
  declarations: [
    TwoDecimalDirectiveDirective,
    FivedecimaldirectiveDirective,
    CurrencyManageComponent,
    // CurrencyPairsComponent,
    FeeManagementComponent,
    FeeManagementNewComponent,
    FeeManagementEditComponent,
    EditFeeLimitComponent,
    CurrencyPairsFeeEditComponent,
    BusellpairComponent,
    BusellpairFeeEditComponent,
    CurrencySummaryComponent,
    CurrencyExponentPipe,
    CurrencySymbolsComponent,
    EditCurrencySymbolsComponent,
    CurrencyPairsComponent
  ]
})
export class CurrencyManagementModule {}
