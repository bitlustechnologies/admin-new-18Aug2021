import { ErrorhandlingService } from './../../services/errorhandling.service';
import { CurrencyManageComponent } from './../../currency-management/currency-manage/currency-manage.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { WithdrawSearchModel } from '../../shared/models/withdraw-search.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

declare var require: any;

@Component({
  selector: 'app-withdrawl',
  templateUrl: './withdrawl.component.html',
  styleUrls: ['./withdrawl.component.scss'],
  styles: [
    `
      ::ng-deep .bs-popover-right {
        margin-left: -0.5rem;
      }
    `
  ]
})
export class WithdrawlComponent implements OnInit {
  searchValForm: any = {};
  toDate: Date;
  fromDate: Date;
  tabActiveId: any = 'tabFiat';
  fiatWithdrawList: any = [];
  empty: boolean = false;
  withdrawList: any[] = [];
  coinList: any[] = [];
  total: any;
  pageNo: any = 1;
  totalRecords: any;
  FiatStatus: any = '';
  totalrecord: any;
  type: string = '';
  withdrawSearchModel: WithdrawSearchModel = new WithdrawSearchModel();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fundservice: FundService,
    private toastr: ToastrService,
    private errorhandling: ErrorhandlingService
  ) {}

  ngOnInit() {
    this.getCoinList();
    this.getWithdrawList(this.withdrawSearchModel);
    if (this.route.snapshot.params.pendingFilter) {
      let filter = atob(this.route.snapshot.params.pendingFilter);
      if (filter == 'pendingInrwithdraw') {
        this.withdrawSearchModel.status = 'signed';
        let obj = {
          coinId: 'all',
          limit: 10,
          offset: 1,
          status: this.withdrawSearchModel.status,
          type: 'withdraw'
        };
        this.getWithdrawList(obj);
      }
    }
  }

  beforeChange(event: NgbTabChangeEvent) {
    this.searchValForm = {};
    this.tabActiveId = event.activeId;
    this.withdrawSearchModel = new WithdrawSearchModel();
    if (this.tabActiveId == 'tabCrypto') {
      let data = {
        status: this.FiatStatus
      };
      this.getFiatWithdraws(data);
    } else {
      this.getWithdrawList(this.withdrawSearchModel);
    }
  }

  prev() {
    if (this.pageNo != 0) {
      this.pageNo = this.pageNo - 1;
      this.withdrawSearchModel.offset = this.pageNo;
      //  this.getWithdrawList(this.withdrawSearchModel);
      if (this.tabActiveId == 'tabCrypto') {
        let data = {};
        this.getFiatWithdraws(data);
      } else {
        this.getWithdrawList(this.withdrawSearchModel);
      }
    }
  }

  next() {
    if (this.pageNo != this.total) {
      this.pageNo = this.pageNo + 1;
      this.withdrawSearchModel.offset = this.pageNo;
    }
    if (this.tabActiveId == 'tabCrypto') {
      let data = {
        status: this.FiatStatus
      };
      this.getFiatWithdraws(data);
    } else {
      this.getWithdrawList(this.withdrawSearchModel);
    }
  }

  historyAccordingToStatus() {}

  changePage(page) {
    this.pageNo = page;
    this.withdrawSearchModel.offset = this.pageNo;
    // this.getWithdrawList(this.withdrawSearchModel);
    if (this.tabActiveId == 'tabCrypto') {
      let data = {
        status: this.FiatStatus
      };
      this.getFiatWithdraws(data);
    } else {
      this.getWithdrawList(this.withdrawSearchModel);
    }
  }

  getCoinList() {
    this.fundservice.getCoinList().subscribe(
      response => {
        this.coinList = response;
        // this.coinList=response.data.currency;
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }

  getFiatWithdraws(e) {
    this.userService.getFiatWithdrawList(this.pageNo, e).subscribe(
      (res: any) => {
        this.fiatWithdrawList = res.json().data;
        this.total = res.json().total;
        // this.total=this.total/10;
      },
      error => {}
    );
  }

  showAll(e) {
    if (e == 'withdraw-crypto') {
      let obj = {
        coinId: 'all',
        userId: '',
        status: 'all',
        fromDate: '',
        toDate: '',
        type: 'withdraw',
      };
      this.getWithdrawList(obj);
    } else {
      let data = {
        status: ''
      };
      this.getFiatWithdraws(data);
    }
  }

  getWithdrawList(withdrawSearchModel) {
    this.fundservice.getWithdrawList(withdrawSearchModel).subscribe(
      response => {
        if (response.status) {
          if (response.totalRecords > 0) {
            this.empty = false;
            this.withdrawList = response.data;
            this.totalRecords = response.totalRecords;
            this.total = this.totalRecords / 10;
          } else {
            this.empty = true;
            this.totalRecords = 0;
            this.withdrawList = [];
          }
        }
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }

  FilterWithdraws(searchForm: NgForm) {
    this.searchValForm = searchForm.value;
    this.pageNo = 1;
    this.withdrawSearchModel.offset = this.pageNo;
    let obj = {};
    for (var key in this.withdrawSearchModel) {
      if (this.withdrawSearchModel.hasOwnProperty(key)) {
        if (this.withdrawSearchModel[key] == '0') obj[key] = this.withdrawSearchModel[key];
        else if (this.withdrawSearchModel[key] != '') obj[key] = this.withdrawSearchModel[key];
      }
    }
    this.getWithdrawList(obj);
  }

  FilterfiatWithdraws(searchForm: NgForm) {
    console.log(searchForm);
    this.searchValForm = searchForm.value;
    this.FiatStatus = searchForm.value['status'];
    this.pageNo = 1;
    // let data ={
    //   status: searchForm.value['status']
    // }
    this.getFiatWithdraws(searchForm.value);
  }

  DownloadCSV(data, typeOrder) {
    if (this.tabActiveId == 'tabCrypto') {
      this.searchValForm['status'] = 'QUEUE';
      this.userService.getFiatWithdrawListDownload(this.searchValForm).subscribe((res: any) => {
        if (res.json().data.length > 0) {
          let resData = res.json().data;
          let arr = resData.map((val: any, i) => {
            resData[i]['Date'] = new Date(val.created_date).toLocaleDateString();
            resData[i]['Time'] = new Date(val.created_date).getTime();
            console.log((resData[i]['Time'] = new Date(val.created_date).getTime()));
            return val;
          });
          this.download(arr, this.type, typeOrder); //fiat
        }
      });
    } else {
      let obj = {};
      if (Object.keys(this.searchValForm).length == 0) {
        obj['status'] = 'all';
        obj['type'] = 'withdraw';
        obj['coinId'] = 'all';
      } else {
        obj = this.searchValForm;
        obj['type'] = 'withdraw';
      }
      this.fundservice.getWithdrawListDownload(obj).subscribe((resp: any) => {
        if (resp.data.length > 0) {
          let data = [];
          let ele = {};
          resp.data.forEach((element: any, i) => {
            ele = {
              Txn_Id: element.txid,
              Date: new Date(element.created_date).toLocaleDateString(),
              Time: new Date(element.created_date).toLocaleTimeString(),
              User_Id: element.user_id,
              Name: element.user_name,
              currency: element.coin_name,
              Amount: element.amount,
              Withdraw_to: element.address_to,
              status: element.status
            };
            data.push(ele);
          });
          this.download(data, this.type, typeOrder);
        }
      });
    }
  }

  download(objdata, type, typeOrder) {
    var csvData = this.ConvertToCSV(objdata, type);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    if (type == 'xlsx') {
      var blob = new Blob([csvData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = typeOrder + '.xlsx';
    } else {
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = typeOrder + '.csv';
    }
    a.click();
  }

  ConvertToCSV(objArray, type) {
    if (type == 'xlsx') {
      var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
    } else {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    }
    var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
    var str = '';
    var row = '';

    for (var index in objArray[0]) {
      row += index + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  copyToClipboard(e) {
    let result = this.copyTextToClipboard(e);
    if (result) {
      // this.commonService.toastr('Link Copied', 'success');
      this.toastr.success('Copied');
    }
  }

  copyTextToClipboard(text) {
    var txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      if (successful) {
        return true;
      }
    } catch (err) {
    } finally {
      document.body.removeChild(txtArea);
    }
    return false;
  }
}
