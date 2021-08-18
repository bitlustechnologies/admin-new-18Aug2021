import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TradersListComponent } from './traders-list/traders-list.component';
import { TradersRoutingModule } from './traders-routing.module';
import { TradersViewComponent } from './traders-view/traders-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    TradersRoutingModule,
    NgbModule
  ],
  declarations: [TradersListComponent, TradersViewComponent]
})
export class TradersManagementModule { }
