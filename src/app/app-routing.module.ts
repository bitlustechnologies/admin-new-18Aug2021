import { FundRoutingModule } from './fund-transaction/fund-routing.module';
import { AuthGuard } from './services/auth-gaurd.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule' },
      { path: 'starter', loadChildren: './starter/starter.module#StarterModule'},
      { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
      { path: 'icons', loadChildren: './icons/icons.module#IconsModule'},
      { path: 'forms', loadChildren: './form/forms.module#FormModule' },
      { path: 'tables', loadChildren: './table/tables.module#TablesModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartModule'},
      { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule'},
      { path: 'extra-component', loadChildren: './extra-component/extra-component.module#ExtraComponentModule'},
      { path: 'apps', loadChildren: './apps/apps.module#AppsModule'},
      { path: 'sample-pages', loadChildren: './sample-pages/sample-pages.module#SamplePagesModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
      { path: 'zadmin', loadChildren: './zadmin/zadmin.module#ZadminModule' },
      { path: 'transcation', loadChildren: './order-transcation/order-transcation.module#OrderTranscationModule' },
      { path: 'fund', loadChildren: './fund-transaction/fund-transaction.module#FundTransactionModule' },
      { path: 'limit-management', loadChildren: './limit-management/limit-management.module#LimitManagementModule' },
      { path: 'currency-summarisation', loadChildren:
      './currency-summarisation/currency-summarisation.module#CurrencySummarisationModule' },
      { path: 'commission-section', loadChildren: './commission-section/commission-section.module#CommissionSectionModule' },
      { path: 'sub-admin-management', loadChildren: './sub-admin-management/sub-admin-management.module#SubAdminManagementModule' },
      { path: 'traders-management', loadChildren: './traders-management/traders-management.module#TradersManagementModule' },
      { path: 'admin-dashboard-section', loadChildren:
      './admin-dashboard-section/admin-dashboard-section.module#AdminDashboardSectionModule' },
      { path: 'currency-management', loadChildren: './currency-management/currency-management.module#CurrencyManagementModule' },
      { path: 'buysell-fee', loadChildren: './buysellfee/buysellfee.module#BuysellfeeModule' },

      { path: 'currency-pairs-management', loadChildren:
      './currency-pairs-management/currency-pairs-management.module#CurrencyPairsManagementModule' },
      // { path: 'earning-management', loadChildren: './earning-management/earning-management.module#EarningManagementModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
      
      { path: 'liquidity', loadChildren:
      './liquidity-management-section/liquidity-management-section.module#LiquidityManagementSectionModule' },
      { path: 'bank-deposits', loadChildren: './bank-deposit/bank-deposit.module#BankDepositModule' },


    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/login'
  }
];
