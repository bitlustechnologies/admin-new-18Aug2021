import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySummaryComponent } from './currency-summary/currency-summary.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxPaginationModule
  ],
  declarations: [CurrencySummaryComponent]
})
export class CurrencySummarisationModule { }
