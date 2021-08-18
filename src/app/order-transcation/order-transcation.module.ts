import { OrderExponentPipe } from './../pipes/order-exponent.pipe';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TablesRoutes } from '../table/tables.routing';
import { BuySellOrderComponent } from './buy-sell-order/buy-sell-order.component';
import { GrowlModule } from 'primeng/growl';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { TablesModule } from '../table/tables.module';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
     NgxDatatableModule, 
     Ng2SmartTableModule,
    //  ToastrModule.forRoot(),
     RouterModule.forChild(TablesRoutes), NgxDatatableModule, Ng2SmartTableModule,
     FormsModule,
     NgxPaginationModule,
     NgbModule,
     GrowlModule,
     HttpModule,
     HttpClientModule,
     TablesModule
  ],
  providers:[ToastrService,NgbActiveModal, ErrorhandlingService],
  declarations: [BuySellOrderComponent, OrderExponentPipe]
})
export class OrderTranscationModule { }
