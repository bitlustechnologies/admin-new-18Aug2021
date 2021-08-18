
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component'
import { WithdrawlComponent } from './withdrawl/withdrawl.component';
import { AuthGuard } from './../services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    
    children: [
      {
        path: 'deposit/:id',
        component: DepositComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Deposit-Transactions',
          urls: [{ title: 'Fund Management', url: '/fund/deposit' }, { title: 'Deposit-Transactions' }]
        }
    },
    {
      path: 'withdrawal',
      component: WithdrawlComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Withdrawal-Transaction',
        urls: [{ title: 'Fund Management', url: '/fund/withdrawal' }, { title: 'Withdrawal-Transaction' }]
      }
  }

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundRoutingModule { }
