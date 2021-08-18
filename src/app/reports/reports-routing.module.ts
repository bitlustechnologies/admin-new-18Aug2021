
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceReportComponent } from './balance-report/balance-report.component'
import { BitgoCoinsReportComponent } from './bitgo-coins-report/bitgo-coins-report.component';
import { CoinProfileComponent } from './coin-profile/coin-profile.component';
import { AuthGuard } from './../services/auth-gaurd.service';
import {ExportComponent} from  './export/export.component'
import { ExternalDepositComponent } from './external-deposit/external-deposit.component';
import { BalanceDetailsComponent } from './balance-details/balance-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bitgo-coins-report',
        component: BitgoCoinsReportComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'BitGo Coins Balance Comparison',
          urls: [{ title: 'Balance Report', url: '/reports/bitgo-coins-report' }, { title: 'BitGo Coins Balance Comparison' }]
        }
    },
    {
      path: 'transfer-funds',
      component: BalanceReportComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Transfer Funds',
        urls: [{ title: 'Balance Report', url: '/reports/transfer-funds' }, { title: 'Transfer Funds' }]
      }
  },
  {
    path: 'balance-details',
    component: BalanceDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Balance Details',
      urls: [{ title: 'Balance Report', url: '/reports/balance-details' }, { title: 'Balance Details' }]
    }
},
{
  path: 'external-deposit',
  component:ExternalDepositComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'External Deposit',
    urls: [{ title: 'Balance Report', url: '/reports/external-deposit' }, { title: 'External Deposit' }]
  }
},
  {
    path: 'export',
    component: ExportComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Export Balance Details',
      urls: [{ title: 'Export Balance Details', url: '/reports/export' }, { title: 'Export Balance Details' }]
    }
}

  ,
    {
      path: 'coin-profile',
      component: CoinProfileComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Coin Profile',
        urls: [{ title: 'Reports', url: '/reports/coin-profile' }, { title: 'Coin Profile' }]
      }
  },
  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
