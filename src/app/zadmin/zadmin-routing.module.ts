import { AuthGuard } from './../services/auth-gaurd.service';
import { FullComponent } from './../layouts/full/full.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  children: [
         
         {path: 'withdraw', loadChildren: './withdraw/withdraw.module#WithdrawModule'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZadminRoutingModule { }
