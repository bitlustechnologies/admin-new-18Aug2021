import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
import { GoogleAuthenticationSettingComponent } from './google-authentication-setting/google-authentication-setting.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { GoogleAuthenticationDisableComponent } from './google-authentication-disable/google-authentication-disable.component';
import { AuthGuard } from './../services/auth-gaurd.service';


const routes: Routes = [
{
  path: '',
  children: [
    {
      path: 'admin-dashboard',
      component: AdminDashboardComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Dashboard',
        urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'Dashboard' }]
      }
    },
    {
      path: 'admin-profile',
      component: AdminProfileComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Profile',
        urls: [{ title: 'Profile', url: '/dashboard' }, { title: 'Profile' }]
      }
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Change Password',
        urls: [{ title: 'Change Password', url: '/dashboard' }, { title: 'Change Password' }]
      }
    },
    {
      path: 'google-authentication-setting',
      component: GoogleAuthenticationSettingComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Enable Google Authentication',
        urls: [{ title: 'Google Authentication', url: '/dashboard' }, { title: 'Google Authentication' }]
      }
    },
    {
      path: 'google-authentication-disable',
      component: GoogleAuthenticationDisableComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Disable Google Authentication',
        urls: [{ title: 'Google Authentication', url: '/dashboard' }, { title: 'Google Authentication' }]
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
