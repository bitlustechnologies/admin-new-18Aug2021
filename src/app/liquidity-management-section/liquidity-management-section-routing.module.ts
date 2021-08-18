import { PairsUpdateComponent } from './pairs-update/pairs-update.component';
import { PairsComponent } from './pairs/pairs.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidityManagementComponent } from './liquidity-management/liquidity-management.component';
// import { ManageLimitEditComponent } from './manage-limit-edit/manage-limit-edit.component';
import { AuthGuard } from './../services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'liquidity-management',
        component: LiquidityManagementComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Liquidity Management',
          urls: [{ title: 'Liquidity Management', url: '/liquidity/liquidity-management' }, { title: 'Liquidity Management' }]
        }
      },
      {
        path: 'pairs',
        component: PairsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Pairs',
          urls: [{ title: 'Pairs', url: '/liquidity/pairs/' }, { title: 'Pairs' }]
        }
      },
      {
        path: 'pairs/:id',
        component: PairsUpdateComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Pairs Update',
          urls: [{ title: 'Pairs Update', url: '/liquidity/pairs/' }, { title: 'Pairs Update' }]
        }
      },
  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiquidityManagementSectionRoutingModule { }
