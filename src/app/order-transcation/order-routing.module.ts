
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuySellOrderComponent } from './buy-sell-order/buy-sell-order.component';
import { AuthGuard } from './../services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    children: [
    //   {
    //     path: 'order-list',
    //     component: OrderListComponent,
    //     canActivate: [AuthGuard],
    //     data: {
    //       title: 'Order-Listing',
    //       urls: [{ title: 'Order-Management', url: '/transcation/order-list' }, { title: 'Order-Listing' }]
    //     }
    // },
  //   {
  //     path: 'trade-summary',
  //     component: TradeSummaryComponent,
  //     canActivate: [AuthGuard],
  //     data: {
  //       title: 'Trade-Summary',
  //       urls: [{ title: 'Order-Management', url: '/transcation/trade-summary' }, { title: 'Trade-Summary' }]
  //     }
  // },
  {
    path: 'buysell-orders',
    component: BuySellOrderComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Buy/Sell Orders',
      urls: [{ title: 'Buy/Sell Orders', url: '/transcation/buysell-orders' }, { title: 'Buy/Sell Orders' }]
    }
}

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
