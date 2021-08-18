import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Message } from '../../apps/email/message';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../../services/user.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepositSearchModel } from '../../shared/models/deposit-search.model';
import { FundService } from '../../services/fund.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
searchValForm:any={}
  userlists: any;
  total: any;
  page: any = 1;
  empty: boolean = false;
  searchVal: string = '';
  totalRecords: any;
  btnDis: boolean = false;
  ImagePath: any;
  depositSearchModel: DepositSearchModel = new DepositSearchModel();
  type: string = '';
  coinList: any[] = [];
  currency_sym: any = 'all';
  receiptImage: any;
  recieptImageAvailable: boolean = false;
  constructor(
    private userservice: UserService,
    private messageservice: MessageService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private errorhandling: ErrorhandlingService,
    private fundservice: FundService,
    private route: ActivatedRoute
  ) {}

  private modalRef: NgbModalRef;

  msgs: Message[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currency_sym = params['id'];
    });

this.depositSearchModel.status ='APPROVAL'
    if(this.route.snapshot.params.pendingFilter){
      let filter = atob(this.route.snapshot.params.pendingFilter)
      if(filter == 'pendingInrDeposit'){
let obj ={
  "limit": 10,
"offset": 1,
"coinId": "all",
"status": "APPROVAL",
"type": "deposit"
}

    this.getUserList(this.page, obj);

      }
    }else{
      this.getUserList(this.page, this.depositSearchModel);

    }

    this.getCoinList();
  }

  openReceiptImage(e) {
    this.receiptImage = e;
    window.open(e,'_blank')
    // this.modalRef = this.modalService.open(this.content);
  }

  getCoinList() {
    this.fundservice.getCoinList().subscribe(
      response => {
        this.coinList = response;
      },
      error => {
        this.errorhandling.errorHandler(error);
      }
    );
  }

  prev() {
    if (this.page != 1) {
      this.getUserList(this.page - 1, this.depositSearchModel);
      this.page = this.page - 1;
    }
  }
  next() {
    if (this.page != this.total) {
      this.getUserList(this.page + 1, this.depositSearchModel);
      this.page = this.page + 1;
    }
  }
  changePage(page) {
    this.page = page;
    this.getUserList(page, this.depositSearchModel);
  }
  goto(val) {
    var tag = val.target;
    var value = Math.floor(parseInt(tag.value));

    if (value >= 1 && value <= this.total) {
      this.getUserList(value, this.depositSearchModel);
      this.page = value;
    }
  }
  searchData(text) {
    this.page = 1;
    this.searchVal = text;
    this.getUserList(this.page, this.depositSearchModel);
  }
  getUserList(limit, depositSearchModel) {
    //  this.userservice.getUserList(limit,this.searchVal)
    this.userservice.getDeposits(limit, depositSearchModel).subscribe(
      response => {
        if (response.json().data.length == 0) this.empty = true;
        else this.empty = false;
        if (response.json().data.transaction_receipt_file_id != null && response.json().data.transaction_receipt_file_id != '') {
          this.recieptImageAvailable = true;
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

  showAll() {
    this.currency_sym = 'all';
    this.depositSearchModel.fromDate = undefined;
    this.depositSearchModel.toDate = undefined;
    this.getUserList(this.page, this.depositSearchModel);
  }

  changeApprove(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then();
  }

  changeStatus(wid, status, reason) {
    this.userservice.changeValueLoading(1);
    if (status == 'REJECTED') {
      if (!reason) {
        this.userservice.changeValueLoading(0);
        this.toastr.error('Please enter reason', 'Error');
        return false;
      }
    } else {
      reason = '';
    }
    this.btnDis = true;

    setTimeout(() => {
      this.btnDis = false;
    }, 3500);

    this.userservice.changeBankDepositStatus(status, wid, reason).subscribe(
      response => {
        this.toastr.success(response.json().message, 'Success');
        this.getUserList(this.page, this.depositSearchModel);
        setTimeout(() => {
          this.getUserList(this.page, this.depositSearchModel);
          this.btnDis = false;
        }, 4000);

        setTimeout(() => {
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
        setTimeout(() => {
          this.btnDis = false;
          this.modalRef.close();
        }, 7000);
        this.userservice.changeValueLoading(0);
        this.toastr.error(error.json().message, 'Error');
      }
    );
  }

  FilterDeposits(searchForm: NgForm) {
    this.searchValForm = searchForm.value
    this.searchValForm['status'] = 'APPROVAL'
    this.searchValForm['type'] = 'deposit'
    this.page = 1;
    this.depositSearchModel.offset = this.page;
    let obj = {};
    for (var key in this.depositSearchModel) {
      if (this.depositSearchModel.hasOwnProperty(key)) {
        if (this.depositSearchModel[key] == '0') obj[key] = this.depositSearchModel[key];
        else if (this.depositSearchModel[key] != '') obj[key] = this.depositSearchModel[key];
      }
    }
    this.getUserList(this.page, this.depositSearchModel);
  }

  DownloadCSV(data) {
    this.searchValForm['status'] = 'APPROVAL'
    this.searchValForm['type'] = 'deposit'
    this.userservice.getDepositsDownload(this.searchValForm).subscribe(
      (response:any) => {
      if(response.json().data.length > 0){

let resData = response.json().data
        let arr = resData.map((val:any,i)=>{
          resData[i]['Submitted_date'] = new Date(val.Submitted_date).toLocaleDateString()
          return val
             })
        this.download(arr, this.type);
      }
      })
  }

  download(objdata, type) {
    var csvData = this.ConvertToCSV(objdata, type);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    if (type == 'xlsx') {
      var blob = new Blob([csvData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Deposit-list.xlsx';
    } else {
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Deposit-list.csv';
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

  ImageClick() {
    this.ImagePath = '../../../assets/images/big/img4.jpg';
  }
}
