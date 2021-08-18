import { EditCurrencySymbolsComponent } from './edit-currency-symbols/edit-currency-symbols.component';
import { CurrencySymbolsComponent } from './currency-symbols/currency-symbols.component';
import { CurrencySummaryComponent } from './currency-summary/currency-summary.component';
import { BusellpairFeeEditComponent } from './busellpair-fee-edit/busellpair-fee-edit.component';
import { BusellpairComponent } from './busellpair/busellpair.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyManageComponent } from './currency-manage/currency-manage.component';
// import { CurrencyPairsComponent } from './currency-pairs/currency-pairs.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { FeeManagementNewComponent } from './fee-management-new/fee-management-new.component';
import { FeeManagementEditComponent } from './fee-management-edit/fee-management-edit.component';
import { EditFeeLimitComponent } from './edit-fee-limit/edit-fee-limit.component';
import { CurrencyPairsFeeEditComponent } from './currency-pairs-fee-edit/currency-pairs-fee-edit.component';
import { AuthGuard } from './../services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'currency-manage',
        component: CurrencyManageComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Currency-Management',
          urls: [{ title: 'Currency-Management', url: '/currency-management/currency-manage' }, { title: 'Currency' }]
        }
      },
      //   {
      //     path: 'currency-pairs',
      //     component: CurrencyPairsComponent,
      //     data: {
      //       title: 'Currency Pairs',
      //       urls: [{ title: 'Currency-Management', url: '/currency-management/currency-pairs' }, { title: 'Currency Pairs' }]
      //     }
      // }
      // ,
      {
        path: 'fee-management',
        component: FeeManagementComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Fee Management',
          urls: [{ title: 'Fee Management', url: '/dashboard' }, { title: 'Fee Management' }]
        }
      },
      {
        path: 'fee-management-new',
        component: FeeManagementNewComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Fee Management',
          urls: [{ title: 'Fee Management', url: '/dashboard' }, { title: 'Fee Management' }]
        }
      },
      {
        path: 'fee-management-edit/:id',
        component: FeeManagementEditComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Fee Management',
          urls: [{ title: 'Fee Management', url: '/dashboard' }, { title: 'Fee Management' }]
        }
      },
      {
        path: 'edit-fee-limit',
        component: EditFeeLimitComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Edit Limits',
          urls: [{ title: 'Currency', url: '/currency-management/currency-manage' }, { title: 'Edit Limits' }]
        }
      },
      {
        path: 'currency-pairs-fee-edit',
        component: CurrencyPairsFeeEditComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Edit Fee',
          urls: [{ title: 'Currency Pairs', url: '/currency-management/currency-pairs' }, { title: 'Edit Fee' }]
        }
      },
      {
        path: 'currency-pairs',
        component: BusellpairComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Buy/Sell Fee Management',
          urls: [{ title: 'Buy/Sell', url: '/buysell-fee' }, { title: 'Currency Pairs' }]
        }
      },

      {
        path: 'buysell-fee-edit',
        component: BusellpairFeeEditComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Buy/Sell Fee Management',
          urls: [{ title: 'Buy/Sell Fee Management', url: '/buysell-fee' }, { title: 'Fee Management' }]
        }
      },

      {
        path: 'currency-summary',
        component: CurrencySummaryComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Currency-Summary',
          urls: [{ title: 'Currency-Management', url: '/summary' }, { title: 'Currency-Summary' }]
        }
      },

      {
        path: 'currency-symbols',
        component: CurrencySymbolsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Active Currency',
          urls: [{ title: 'Currency Management', url: '/currency-symbols' }, { title: 'Active Currency' }]
        }
      },
      {
        path: 'edit-currency-symbols',
        component: EditCurrencySymbolsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Edit Active Currency',
          urls: [{ title: 'Currency Management', url: '/edit-currency-symbols' }, { title: 'Edit Active Currency' }]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyManagementRoutingModule {}
