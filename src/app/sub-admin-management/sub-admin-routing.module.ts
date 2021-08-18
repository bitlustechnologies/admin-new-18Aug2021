import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubAdminUsersComponent } from './sub-admin-users/sub-admin-users.component';
import { SubAdminNewComponent } from './sub-admin-new/sub-admin-new.component';
import { SubAdminEditComponent } from './sub-admin-edit/sub-admin-edit.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sub-admin-users',
        component: SubAdminUsersComponent,
        data: {
          title: 'Sub-Admin-Management',
          urls: [{ title: 'Sub-Admin-Management', url: '/dashboard' }, { title: 'Sub-Admin-Management' }]
        }
    },
    {
      path: 'sub-admin-new',
      component: SubAdminNewComponent,
      data: {
        title: 'Sub-Admin-Management',
        urls: [{ title: 'Sub-Admin-Management', url: '/dashboard' }, { title: 'Sub-Admin-Management' }]
      }
  }
  ,
  {
    path: 'sub-admin-edit/:id',
    component: SubAdminEditComponent,
    data: {
      title: 'Sub-Admin-Management',
      urls: [{ title: 'Sub-Admin-Management', url: '/dashboard' }, { title: 'Sub-Admin-Management' }]
    }
}
  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdminRoutingModule { }
