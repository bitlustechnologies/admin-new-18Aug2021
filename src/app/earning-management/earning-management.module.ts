import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarningsListComponent } from './earnings-list/earnings-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EarningManagementRoutingModule } from './earning-management-routing.module';
import { EarningWithdrawComponent } from './earning-withdraw/earning-withdraw.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    FormsModule,
    NgbModule,
    EarningManagementRoutingModule,
    // ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers:[ToastrService],
  declarations: [EarningsListComponent, EarningWithdrawComponent]
})
export class EarningManagementModule { }
