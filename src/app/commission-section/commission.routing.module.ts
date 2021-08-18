import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionFeesComponent } from './commission-fees/commission-fees.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'commision-fee',
        component: CommissionFeesComponent,
        data: {
          title: 'Commision fees',
          urls: [{ title: 'Commision-fees', url: '/dashboard' }, { title: 'Commision-fees' }]
        }
  }

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule { }
