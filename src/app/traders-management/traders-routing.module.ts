
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradersListComponent } from './traders-list/traders-list.component';
import { TradersViewComponent } from './traders-view/traders-view.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'traders-list',
        component: TradersListComponent,
        data: {
          title: 'Users-Management',
          urls: [{ title: 'Users-Management', url: '/dashboard' }, { title: 'Users-Management' }]
        }
    },
    {
      path: 'traders-view/:id',
      component: TradersViewComponent,
      data: {
        title: 'Users-Management',
        urls: [{ title: 'Users-Management', url: '/dashboard' }, { title: 'Users-Management' }]
      }
  }
  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradersRoutingModule { }
