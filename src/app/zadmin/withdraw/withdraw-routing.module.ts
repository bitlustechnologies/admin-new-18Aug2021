import { ListsComponent } from './lists/lists.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'list',
      component: ListsComponent,
      data: {
        title: 'Withdraw Approval',
        urls: [{ title: '', url: '/list' }, { title: '' }]
      }
  },
 
  

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawRoutingModule { }
