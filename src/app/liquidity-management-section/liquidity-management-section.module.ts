import { PairsUpdateComponent } from './pairs-update/pairs-update.component';
import { PairsComponent } from './pairs/pairs.component';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidityManagementComponent } from './liquidity-management/liquidity-management.component';
import { LiquidityManagementSectionRoutingModule } from './liquidity-management-section-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { BuysellService } from '../services/buysell.service';
import { GrowlModule } from 'primeng/growl';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgbModule,
    NgxPaginationModule,
    LiquidityManagementSectionRoutingModule,
    FormsModule,
    GrowlModule,
    // ToastrModule.forRoot(),
    HttpModule,
    HttpClientModule,
  ],
  declarations: [LiquidityManagementComponent, PairsComponent, PairsUpdateComponent],
  providers:[BuysellService,ToastrService, ErrorhandlingService]
})
export class LiquidityManagementSectionModule { }
