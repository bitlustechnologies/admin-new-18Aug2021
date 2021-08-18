import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionFeesComponent } from './commission-fees/commission-fees.component';
import { CommissionRoutingModule } from './commission.routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    CommissionRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  declarations: [CommissionFeesComponent]
})
export class CommissionSectionModule { }
