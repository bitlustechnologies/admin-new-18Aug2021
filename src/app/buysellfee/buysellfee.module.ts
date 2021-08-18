import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuysellfeeRoutingModule } from './buysellfee-routing.module';
import { BusellpairComponent } from './busellpair/busellpair.component';
import { BusellpairFeeEditComponent } from './busellpair-fee-edit/busellpair-fee-edit.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [BusellpairComponent, BusellpairFeeEditComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgbModule,
    FormsModule,
    // ToastrModule.forRoot(),
    BuysellfeeRoutingModule
  ],
  providers:[ToastrService],
})
export class BuysellfeeModule { }
