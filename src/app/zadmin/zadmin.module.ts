import { ErrorhandlingService } from './../services/errorhandling.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZadminRoutingModule } from './zadmin-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ZadminRoutingModule,
    HttpModule,
    HttpClientModule,
    // ToastrModule.forRoot()
  ],
  declarations: [],
  providers:[ ErrorhandlingService, ToastrService],
})
export class ZadminModule { }
