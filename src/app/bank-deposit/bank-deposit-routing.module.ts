import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ApprovedComponent } from './approved/approved.component';
import { AuthGuard } from './../services/auth-gaurd.service';


const routes: Routes = [{

  path: '',
  
    children: [
      {
        path: 'list/:id',
        component: ListComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Deposit Requests',
          urls: [{ title: 'Deposit Requests', url: '/bank-deposits/list' }, { title: 'Deposits' }]
        }
    },
    {
      path: 'approved',
      component: ApprovedComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Deposits - Approved',
        urls: [{ title: 'Deposits Approved', url: '/bank-deposits/approved' }, { title: 'Approved Deposits' }]
      }
  },

    



  
]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankDepositRoutingModule { }
