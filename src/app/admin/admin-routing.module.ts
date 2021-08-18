import { MemberApprovedComponent } from './member-approved/member-approved.component';
import { KycComponent } from './kyc/kyc.component';
import { MemberComponent } from './member/member.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedComponent } from './approved/approved.component';
import { TradersListComponent } from './traders-list/traders-list.component';
import { TradersViewComponent } from './traders-view/traders-view.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { MemberApprovedEditComponent } from './member-approved-edit/member-approved-edit.component';
// import { UserOverviewComponent } from './user-overview/user-overview.component';
import { AuthGuard } from './../services/auth-gaurd.service';
import { BanksComponent } from './banks/banks.component';
import { BankAddComponent } from './bank-add/bank-add.component';
import { BankEditComponent } from './bank-edit/bank-edit.component';
import { PesaEditComponent } from './pesa-edit/pesa-edit.component';
import { PesaAddComponent } from './pesa-add/pesa-add.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserBankDetailsComponent } from './user-bank-details/user-bank-details.component';
import { UserBankEditComponent } from './user-bank-edit/user-bank-edit.component';
import { UserBankViewComponent } from './user-bank-view/user-bank-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'members',
        component: MemberComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Submitted KYC',
          urls: [{ title: 'Submitted KYC', url: '/dashboard' }, { title: 'Submitted KYC' }]
        }
      },
      {
        path: 'approved_kyc',
        component: MemberApprovedComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Members - Approved',
          urls: [{ title: 'Users Management', url: '/admin/approved_kyc' }, { title: 'Approved KYC' }]
        }
      },
      {
        path: 'kyc/:id',
        component: KycComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'User KYC',
          urls: [{ title: 'Submit KYC', url: '/admin/members' }, { title: 'User KYC' }]
        }
      },
      {
        path: 'approved/:id',
        component: ApprovedComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'User Approved KYC',
          urls: [{ title: 'Approved KYC', url: '/admin/approved_kyc' }, { title: 'User Approved KYC' }]
        }
      },
      {
        path: '',
        children: [
          {
            path: 'users-list',
            component: TradersListComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Users',
              urls: [{ title: 'User-Management', url: '/admin/traders-list' }, { title: 'Users' }]
            }
          },
          {
            path: 'users-view/:id',
            component: TradersViewComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Users',
              urls: [{ title: 'Users', url: '/admin/traders-list' }, { title: 'Users-View' }]
            }
          },
          {
            path: 'member-approved-edit/:id',
            component: MemberApprovedEditComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Members-Edit',
              urls: [{ title: 'Approved KYC', url: '/admin/approved_kyc' }, { title: 'Members-Edit' }]
            }
          },
          {
            path: 'user-bank',
            component: UserBankDetailsComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'User Bank',
              urls: [{ title: 'Bank Detail', url: '/admin/user-bank' }, { title: 'User bank' }]
            }
          },
          {
            path: 'user-bank-update/:id',
            component: UserBankEditComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Update Bank Details',
              urls: [{ title: 'Bank Detail', url: '/admin/user-bank-update' }, { title: 'Update Bank Details' }]
            }
          },
          {
            path: 'user-bank-view/:id/:page',
            component: UserBankViewComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'View Bank Details',
              urls: [{ title: 'Bank Detail', url: '/admin/user-bank-view' }, { title: 'View Bank Details' }]
            }
          },
          {
            path: 'activity-log',
            component: ActivityLogComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'User Activity',
              urls: [{ title: 'User Activity', url: '/dashboard' }, { title: 'User Activity' }]
            }
          },
          // {
          //   path: 'user-overview',
          //   component: UserOverviewComponent,
          //   canActivate: [AuthGuard],
          //   data: {
          //     title: 'Overview',
          //     urls: [{ title: 'Overview', url: '/dashboard' }, { title: 'Overview' }]
          //   }
          // },
          {
            path: 'banks',
            component: BanksComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Banks',
              urls: [{ title: 'Banks', url: '/admin/banks' }, { title: 'Banks' }]
            }
          },
          {
            path: 'bank_add',
            component: BankAddComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Add Bank',
              urls: [{ title: 'Add Bank', url: '/admin/bank_add' }, { title: 'Add Bank' }]
            }
          },
          {
            path: 'bank_edit/:id',
            component: BankEditComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Edit Bank',
              urls: [{ title: 'Edit Bank', url: '/admin/bank_edit' }, { title: 'Edit Bank' }]
            }
          },
          {
            path: 'pesa-edit/:id',
            component: PesaEditComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Edit Pesalink',
              urls: [{ title: 'Edit Pesalink', url: '/admin/pesa_edit' }, { title: 'Edit Pesalink' }]
            }
          },
          {
            path: 'pesa-add',
            component: PesaAddComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Add Pesalink',
              urls: [{ title: 'Add Pesalink', url: '/admin/pesa_add' }, { title: 'Add Pesalink' }]
            }
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
            canActivate: [AuthGuard],
            data: {
              title: 'Notifications',
              urls: [{ title: 'Notifications', url: '/admin/notifications' }, { title: 'All' }]
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
