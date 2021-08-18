import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusellpairComponent } from './busellpair/busellpair.component';
import { BusellpairFeeEditComponent } from './busellpair-fee-edit/busellpair-fee-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BusellpairComponent,
        data: {
          title: 'Buy/Sell Fee Management',
          urls: [{ title: 'BuySell-Management', url: '/buysell-fee' }, { title: 'BuySell' }]
        }
  },
  {
    path: 'buysell-fee-edit',
    component: BusellpairFeeEditComponent,
    data: {
      title: 'Buy/Sell Fee Management',
      urls: [{ title: 'Buy/Sell Fee Management', url: '/buysell-fee' }, { title: 'Fee Management' }]
    }
  },

]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuysellfeeRoutingModule { }
