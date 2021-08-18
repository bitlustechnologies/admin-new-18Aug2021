import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPairsComponent } from './currency-pairs/currency-pairs.component';
import { CurrencyPairsManagementRoutingModule } from './currency-pairs-management.routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CurrencyPairsManagementRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgbModule
  ],
  declarations: [CurrencyPairsComponent]
})
export class CurrencyPairsManagementModule { }
