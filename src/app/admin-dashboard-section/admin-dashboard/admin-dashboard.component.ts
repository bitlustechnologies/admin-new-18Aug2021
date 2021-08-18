import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { AdminCounterModel } from '../../shared/models/admin-counter.model';
import { Router } from '@angular/router';

declare var require: any;

const data: any = require('./data.json');

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userRole: any;
  counterList: AdminCounterModel = new AdminCounterModel();
  counterListCrypto: AdminCounterModel = new AdminCounterModel();
  pairKeyList: string[] = [];
  tradeList: any[] = [];
  volumeList: any[] = [];
  monthList: any[] = [];
  tradeData: any[] = [];
  withdrawData: any[] = [];
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true, barThickness: 5 };
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartLabels: any[] = ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartData: any[] = [{ data: [], label: '' }, { data: [], label: '' }];
  // public lineChartLabels: Array<any> =['Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // public lineChartData:any[]=[{ data: [], label:'' }, { data: [], label:'' } ]
  public barChartLabels1: any[] = ['ZAR|BTC', 'ZAR|ETH'];
  // public barChartData1: any[] = [{ data: [0], label: 'Trade' }];
  // public barChartData2: any[] = [{ data: [0], label: 'Volume' }];
  constructor(private userservice: UserService, private errorhandling: ErrorhandlingService,private router :Router) {}
  public barChartColors: Array<any> = [{ backgroundColor: '#55ce63' }, { backgroundColor: '#009efb' }];
  public barChartColors2: Array<any> = [{ backgroundColor: '#009efb' }];
  public barChartColors1: Array<any> = [{ backgroundColor: '#55ce63' }, { backgroundColor: '#009efb' }];

  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public barChartType = 'bar';
  public barChartLegend = true;

  // tslint:disable-next-line:max-line-length
  // public barChartData: any[] = [{ data: [65, 59, 80, 81, 56, 55, 40,86, 58,53,76,78], label: 'NEW USERS' }, { data: [28, 48, 40, 19, 86, 27, 90, 76, 58,63,76,78], label: 'ACTIVE USERS' }];
  // public barChartColors: Array<any> = [{ backgroundColor: '#55ce63' }, { backgroundColor: '#009efb' }];

  // public barChartData2: any[] = [ { data: [28, 48, 40, 19, 86, 27, 90], label: 'Volume' }];
  // public barChartColors2: Array<any> = [ { backgroundColor: '#009efb' }];

  // tslint:disable-next-line:max-line-length
  // public barChartData1: any[] = [{ data: [65, 59, 80, 81, 56, 55, 19], label: 'Trade' }];
  // public barChartColors1: Array<any> = [{ backgroundColor: '#55ce63' }, { backgroundColor: '#009efb' }];

  // This is for the dashboar line chart
  // lineChart
  // tslint:disable-next-line:max-line-length
  // public lineChartData: Array<any> = [{ data: [0, 5, 6, 8, 25,3,19,3,20,10,20,25], label: 'Withdraw' }, { data: [0, 3, 1, 2, 8,10,5,15,4,6,18,20], label: 'Trade' }];
  // public lineChartData: Array<any> = [{ data: [0, 5, 6, 8, 25,3,19,3,20,10,20,25], label: 'Withdraw' }];
  public lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(6,215,156,0.1)',
      borderColor: 'rgba(6,215,156,1)',
      pointBackgroundColor: 'rgba(6,215,156,1)',
      pointBorderColor: '#fff',

      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(6,215,156,0.5)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(57,139,247,0.2)',
      borderColor: 'rgba(57,139,247,1)',
      pointBackgroundColor: 'rgba(57,139,247,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(57,139,247,0.5)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  ngOnInit() {
    this.getNewAndActiveUsers();
    this.getAllCounters();
    this.getAllCrypto();
    // this.getTradeWithdrawComparison();
    this.userProfile();
  }

  getAllCounters() {
    this.userservice.getAllCounters().subscribe(
      response => {
        if (response.status) {
          this.counterList = response.data;
        }
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }



  navigateToPending(e){
    if(e == 'pendingCryptoDeposit'){
      this.router.navigate(['/fund/deposit/all',{pendingFilter:btoa(e)}])
    }
    // [routerLink]="['']"
    if(e == 'pendingInrwithdraw'){
      this.router.navigate(['/zadmin/withdraw/list',{pendingFilter:btoa(e)}])

    }
    if(e == 'pendingInrDeposit'){
      this.router.navigate(['/bank-deposits/list/all',{pendingFilter:btoa(e)}])

    }

    // [routerLink]="['/bank-deposits/list/all']"
       
  }


  getAllCrypto() {
    this.userservice.getAllCentralBalance().subscribe(
      response => {
        console.log(response);
        if (response.status) {
          let counterListCrypto = response.data;
          this.counterListCrypto = counterListCrypto.filter((val: any) => val.currency_symbol != 'usdt');
        }
      },
      error => {
        this.errorhandling.errorHandler(error);
      }
    );
  }

  // getTradeVolumeComparison() {
  //   this.userservice.getTradeVolumeComparison().subscribe(
  //     response => {
  //       if (response.status) {
  //         this.barChartData1 = [
  //           {
  //             data: response.data.trades,
  //             label: 'Trade'
  //           }
  //         ];

  //         this.barChartData2 = [
  //           {
  //             data: response.data.volume,
  //             label: 'Volume'
  //           }
  //         ];
  //       }
  //     },
  //     error => {
  //       // this.userservice.changeValueLoading(0);
  //       this.errorhandling.errorHandler(error);
  //     }
  //   );
  // }

  // getTradeWithdrawComparison(){

  //   this.userservice.getWithdrawComparison()
  //   .subscribe(response => {

  //     this.lineChartData = [
  //       {
  //         data: response.data.withdraws,
  //         label: 'Withdraw'
  //       } //,
  //       // {
  //       //   data: response.data.trades,
  //       //   label: 'Trade'
  //       // }
  //     ];

  //   },(error)=>{
  //     // this.userservice.changeValueLoading(0);
  //     this.errorhandling.errorHandler(error)
  //   })
  // }

  getNewAndActiveUsers() {
    this.userservice.getNewAndActiveUsers().subscribe(
      response => {
        if (response.status) {
          this.barChartData = [
            {
              data: response.data.newUsers,
              label: 'NEW USERS'
            },
            {
              data: response.data.activeUsers,
              label: 'ACTIVE USERS'
            }
          ];
        }
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }
  userProfile() {
    this.userservice.getuserProfile().subscribe((res: any) => {
      this.userRole = res.json().data.user_role;
    });
  }
  // ngAfterViewInit() {}
}
