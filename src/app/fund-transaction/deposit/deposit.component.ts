import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { DepositSearchModel } from '../../shared/models/deposit-search.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
// declare var require: any;
// const data: any = require('./company.json');

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
  styles: [
    `
      ::ng-deep .bs-popover-right {
        margin-left: -7.5rem;
      }
    `
  ]
})
export class DepositComponent implements OnInit {
  searchFormVals: any = {};
  tabActiveId: any = 'tabFiat';
  currency_sym: any = 'all';
  userlists: any;
  page = 1;
  empty: boolean = false;
  depositList: any[] = [];
  coinList: any[] = [];
  total: any;
  pageNo: any = 1;
  // pageno:any=0
  totalRecords: any;
  type: string = '';
  crypto_id: any = '';
  ImagePath: any;
  depositSearchModel: DepositSearchModel = new DepositSearchModel();
  reasonText;
  constructor(
    private userservice: UserService,
    private fundservice: FundService,
    private toastr: ToastrService,
    private errorhandling: ErrorhandlingService,
    private route: ActivatedRoute // private modalRef: NgbModalRef, // private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.depositSearchModel.status = 'all';
    this.route.params.subscribe(params => {
      this.crypto_id = params['id'];
      this.depositSearchModel.coinId = params['id'];
    });
    if (this.route.snapshot.params.pendingFilter) {
      let filter = atob(this.route.snapshot.params.pendingFilter);
      if (filter == 'pendingCryptoDeposit') {
        this.depositSearchModel.status = 'unconfirmed';
        let obj = {
          coinId: 'all',
          limit: 10,
          offset: 1,
          status: 'unconfirmed',
          type: 'deposit'
        };
        this.getDepositList(obj);
      }
    }
    this.getCoinList();
    this.getDepositList(this.depositSearchModel);
  }

  beforeChange(event: NgbTabChangeEvent) {
    this.tabActiveId = event.activeId;
    this.pageNo = 1;
    this.depositSearchModel = new DepositSearchModel();
    if (this.tabActiveId == 'tabCrypto') {
      let obj = {
        limit: 10,
        offset: 1,
        coinId: 'all',
        status: 'all',
        type: 'deposit',
        email: '',
        referredBy: ''
      };
      this.getUserList(this.page, obj);
    } else {
      this.getDepositList(this.depositSearchModel);
    }
  }
  openReceiptImage(e) {
    window.open(e, '_blank');
  }

  getUserList(limit, depositSearchModel) {
    //  this.userservice.getUserList(limit,this.searchVal)
    this.userservice.getDeposits(limit, depositSearchModel).subscribe(
      response => {
        console.log(response.json());
        if (response.json().data.length == 0) this.empty = true;
        else this.empty = false;
        if (response.json().data.transaction_receipt_file_id != null && response.json().data.transaction_receipt_file_id != '') {
          this.ImagePath = response.json().data.transaction_receipt_file_id;
        }
        if (this.currency_sym != 'all') {
          this.userlists = response.json().data.filter(x => x.currency_symbol == this.currency_sym);
        } else {
          this.userlists = response.json().data;
        }

        if (this.userlists.length == 0) this.empty = true;
        else this.empty = false;
        let list_total = this.userlists.length;
        this.total = Math.ceil(list_total / 10);
        this.totalRecords = response.json().total;
      },
      error => {
        this.errorhandling.errorHandler(error);
      }
    );
  }

  prev() {
    if (this.pageNo != 1) {
      this.pageNo = this.pageNo - 1;
      // this.pageNo = this.pageNo*10;

      if (this.tabActiveId == 'tabCrypto') {
        if (this.depositSearchModel.status == 'all') {
          //commented on Apr6 filter issue only approved are listing
          // this.depositSearchModel.status = 'CONFIRMED';
          this.getUserList(this.pageNo, this.depositSearchModel);
        } else {
          this.getUserList(this.pageNo, this.depositSearchModel);
        }
      } else {
        this.depositSearchModel.offset = this.pageNo;
        this.getDepositList(this.depositSearchModel);
      }
    }
  }

  next() {
    if (this.pageNo != this.total) {
      this.pageNo = this.pageNo + 1;
      // this.pageNo = this.pageNo*10;
      if (this.tabActiveId == 'tabCrypto') {
        if (this.depositSearchModel.status == 'all') {
          //commented on Apr6 filter issue only approved are listing
          // this.depositSearchModel.status = 'CONFIRMED';
          this.getUserList(this.pageNo, this.depositSearchModel);
        } else {
          this.getUserList(this.pageNo, this.depositSearchModel);
        }
      } else {
        this.depositSearchModel.offset = this.pageNo;
        this.getDepositList(this.depositSearchModel);
      }
    }
  }

  changePage(page) {
    this.pageNo = page;
    this.depositSearchModel.offset = this.pageNo;
    if (this.tabActiveId == 'tabCrypto') {
      if (this.depositSearchModel.status == 'all') {
        //commented on Apr6 filter issue only approved are listing
        // this.depositSearchModel.status = 'CONFIRMED';
        this.getUserList(this.pageNo, this.depositSearchModel);
      } else {
        this.getUserList(this.pageNo, this.depositSearchModel);
      }
    } else {
      this.getDepositList(this.depositSearchModel);
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

  openReasonModal(reason, e) {
    this.reasonText = e;
    // this.modalRef = this.modalService.open(reason);
    // this.modalRef.result.then();
  }

  getDepositList(depositSearchModel) {
    this.fundservice.getDepositList(depositSearchModel).subscribe(
      response => {
        if (response.status) {
          if (response.totalRecords > 0) {
            this.empty = false;
            if (this.crypto_id != '' && this.crypto_id != 'all') {
              this.depositList = response.data.filter(x => x.coin == this.crypto_id);
            } else {
              this.depositList = response.data;
            }
            this.totalRecords = response.totalRecords;
            this.total = this.totalRecords / 10;
          } else {
            this.empty = true;
            this.totalRecords = 0;
            this.depositList = [];
          }
        }
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }

  FilterDeposits(searchForm: NgForm) {
    console.log('><><><><><', searchForm);
    this.searchFormVals = searchForm.value;
    if (this.tabActiveId == 'tabCrypto') {
      this.depositSearchModel.status = searchForm.value.status;
      let obj = {
        limit: 10,
        offset: 1,
        coinId: 'all',
        status: searchForm.value.status,
        fromDate: searchForm.value.fromDate,
        toDate: searchForm.value.toDate,
        type: 'deposit',
        email: searchForm.value.email,
        referredBy: searchForm.value.referredBy
      };
      this.getUserList(this.page, obj);
    } else {
      this.pageNo = 1;
      this.depositSearchModel.offset = this.pageNo;
      let obj = {};
      this.crypto_id = searchForm.value.coinId;
      for (var key in this.depositSearchModel) {
        if (this.depositSearchModel.hasOwnProperty(key)) {
          if (this.depositSearchModel[key] == '0') obj[key] = this.depositSearchModel[key];
          else if (this.depositSearchModel[key] != '') obj[key] = this.depositSearchModel[key];
        }
      }
      this.getDepositList(obj);
    }
  }

  showAll(e) {
    if (e == 'deposit-crypto') {
      let obj = {
        coinId: 'all',
        limit: 10,
        offset: 1,
        status: 'unconfirmed',
        type: 'deposit'
      };
      this.getDepositList(obj);
    } else {
      let obj = {
        limit: 10,
        offset: 1,
        coinId: 'all',
        status: 'CONFIRMED',
        type: 'deposit'
      };
      this.getUserList(this.page, obj);
    }
  }

  DownloadCSV(data, typeOrder) {
    if (this.tabActiveId == 'tabCrypto') {
      let obj = {};
      if (Object.keys(this.searchFormVals).length == 0) {
        obj['type'] = 'deposit';
        obj['status'] = 'CONFIRMED';
      }

      this.userservice.getDepositsDownload(obj).subscribe((response: any) => {
        if (response.json().data.length > 0) {
          let resData = response.json().data;
          let arr = resData.map((val: any, i) => {
            resData[i]['Submitted_date'] = new Date(val.Submitted_date).toLocaleDateString();
            return val;
          });
          this.download(arr, this.type, typeOrder); // fiat
        }
      });
    } else {
      let obj = {};
      if (Object.keys(this.searchFormVals).length == 0) {
        obj = {
          coinId: 'all',
          status: 'all',
          type: 'deposit'
        };
      } else {
        obj = this.searchFormVals;
        obj['type'] = 'deposit';
      }
      this.fundservice.getDepositListDownload(obj).subscribe((response: any) => {
        if (response.data.length > 0) {
          let data = [];
          let ele = {};
          response.data.forEach((element: any, i) => {
            ele = {
              Txn_Id: element.txid,
              Date: new Date(element.created_date).toLocaleDateString(),
              User_Id: element.user_id,
              Name: element.user_name,
              currency: element.coin_name,
              Amount: element.amount,
              Status: element.status
            };
            data.push(ele);
          });
          this.download(data, this.type, typeOrder); // crypto
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
      var blob = new Blob([csvData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = typeOrder + '.xlsx';
    } else {
      var blob = new Blob([csvData], {
        type: 'text/csv'
      });
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
