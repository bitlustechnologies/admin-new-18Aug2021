import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageLimitComponent } from './manage-limit/manage-limit.component';
import { LimitRoutingModule } from './limit-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { ManageLimitEditComponent } from './manage-limit-edit/manage-limit-edit.component';

@NgModule({
  imports: [
    CommonModule,
    LimitRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  // declarations: [ManageLimitComponent, ManageLimitEditComponent]
  declarations: [ManageLimitComponent]
})
export class LimitManagementModule { }
