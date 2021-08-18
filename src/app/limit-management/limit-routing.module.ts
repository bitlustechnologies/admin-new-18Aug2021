
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageLimitComponent } from './manage-limit/manage-limit.component';
// import { ManageLimitEditComponent } from './manage-limit-edit/manage-limit-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'managelimit',
        component: ManageLimitComponent,
        data: {
          title: 'Limit-Management',
          urls: [{ title: 'Limit-Management', url: '/dashboard' }, { title: 'Limit-Management' }]
        }
    }
  //   ,{
  //     path: 'managelimit-edit',
  //     component: ManageLimitEditComponent,
  //     data: {
  //       title: 'Limit-Management',
  //       urls: [{ title: 'Limit-Management', url: '/dashboard' }, { title: 'Limit-Management' }]
  //     }
  // }

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitRoutingModule { }
