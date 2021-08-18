import { SettingExponentPipe } from './../pipes/setting-exponent.pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDetailComponent } from './setting-detail/setting-detail.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { BuysellService } from '../services/buysell.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    // ToastrModule.forRoot()
  ],
  declarations: [SettingDetailComponent, ListComponent, SettingExponentPipe],
  providers:[BuysellService, ErrorhandlingService, ToastrService]
})
export class SettingsModule { }
