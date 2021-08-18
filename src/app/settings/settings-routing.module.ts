
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingDetailComponent } from './setting-detail/setting-detail.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './../services/auth-gaurd.service';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'setting-detail/:id',
        component: SettingDetailComponent,
        canActivate: [AuthGuard], 
        data: {
          title: 'Update Price',
          urls: [{ title: 'Price Management', url: '/settings/setting-list' }, { title: 'Update Price' }]
        }
    },
    {
      path: 'setting-list',
      component: ListComponent,
      canActivate: [AuthGuard], 
      data: {
        title: 'Price Management',
        urls: []
      }
  }

  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
