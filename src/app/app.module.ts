import { OrderService } from './services/order.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserIdleModule } from 'angular-user-idle';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HttpModule } from '@angular/http';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-gaurd.service';
import { GrowlModule } from 'primeng/growl';
import { Message } from 'primeng/api';
import { SubAdminService } from './services/sub-admin.service';
import { FundService } from './services/fund.service';
import { CurrencyService } from './services/currency.service';
import { ReferralService } from './services/referral.service';
import { ReportService } from './services/report.service';
import { BankDepositModule } from './bank-deposit/bank-deposit.module';
import { NgxLoadingModule } from 'ngx-loading';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { MessagingService } from './services/messaging.service';
import { ToastrModule } from 'ngx-toastr';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [AppComponent, SpinnerComponent, FullComponent, BlankComponent, NavigationComponent, BreadcrumbComponent, SidebarComponent],
  imports: [
    HttpModule,
    CommonModule,
    BrowserModule,
    GrowlModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    PerfectScrollbarModule,
    UserIdleModule.forRoot({ idle: 3600, timeout: 1, ping: 60 }),
    NgxLoadingModule.forRoot({}),
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    MessageService,
    SubAdminService,
    CurrencyService,
    ReportService,
    OrderService,
    FundService,
    ReferralService,
    Title,
    UserService,
    MessagingService,
    AsyncPipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
