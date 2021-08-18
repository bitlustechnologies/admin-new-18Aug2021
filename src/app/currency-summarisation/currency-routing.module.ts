import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencySummaryComponent } from './currency-summary/currency-summary.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'summary',
        component: CurrencySummaryComponent,
        data: {
          title: 'Currency-Summary',
          urls: [{ title: 'Currency-Management', url: '/currency-summarisation/summary' }, { title: 'Currency-Summary' }]
        }
  }

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
