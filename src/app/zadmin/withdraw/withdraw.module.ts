import { WithdrawreqExponentPipe } from './../../pipes/withdrawreq-exponent.pipe';
import { ErrorhandlingService } from './../../services/errorhandling.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutes } from './../../table/tables.routing';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { ListsComponent } from './lists/lists.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { TablesModule } from '../../table/tables.module';

@NgModule({
  imports: [
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    CommonModule,
    WithdrawRoutingModule,
    RouterModule.forChild(TablesRoutes), NgxDatatableModule, Ng2SmartTableModule,
    HttpModule,
    HttpClientModule,
    TablesModule

  ],
  declarations: [ListsComponent, WithdrawreqExponentPipe],
  providers:[ ErrorhandlingService]
})
export class WithdrawModule { }
