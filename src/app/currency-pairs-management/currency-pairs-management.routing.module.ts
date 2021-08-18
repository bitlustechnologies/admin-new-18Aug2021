import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyPairsComponent } from './currency-pairs/currency-pairs.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'currency-pairs',
        component: CurrencyPairsComponent,
        data: {
          title: 'Currency Pairs',
          urls: [{ title: 'Currency Pairs', url: '/dashboard' }, { title: 'Currency Pairs' }]
        }
  }

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyPairsManagementRoutingModule { }
