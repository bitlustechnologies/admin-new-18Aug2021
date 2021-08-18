import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminUsersComponent } from './sub-admin-users/sub-admin-users.component';
import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SubAdminNewComponent } from './sub-admin-new/sub-admin-new.component';
import { FormsModule } from '@angular/forms';
import { SubAdminEditComponent } from './sub-admin-edit/sub-admin-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TablesRoutes } from '../table/tables.routing';
import { TablesModule } from '../table/tables.module';

@NgModule({
  imports: [
    CommonModule,
    TablesModule,
    SubAdminRoutingModule,
    NgxDatatableModule, Ng2SmartTableModule,
    FormsModule,
    NgxPaginationModule,
    // ToastrModule.forRoot(),
    NgbModule,
    RouterModule.forChild(TablesRoutes), NgxDatatableModule, Ng2SmartTableModule,

  ],
  providers:[ToastrService,NgbActiveModal],
  declarations: [SubAdminUsersComponent, SubAdminNewComponent, SubAdminEditComponent]
})
export class SubAdminManagementModule { }
