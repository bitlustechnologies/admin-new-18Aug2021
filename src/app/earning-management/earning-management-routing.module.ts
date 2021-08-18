import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EarningsListComponent } from './earnings-list/earnings-list.component'
import { EarningWithdrawComponent } from './earning-withdraw/earning-withdraw.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'earnings-list',
        component: EarningsListComponent,
        data: {
          title: 'Earnings',
          urls: [{ title: 'Earnings', url: '/dashboard' }, { title: 'Earnings' }]
        }
  },
  {
    path: 'earning-withdraw/:id',
    component: EarningWithdrawComponent,
    data: {
      title: 'Earning Withdraw',
      urls: [{ title: 'Earning Withdraw', url: '/dashboard' }, { title: 'Earning Withdraw' }]
    }
}
  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarningManagementRoutingModule { }
