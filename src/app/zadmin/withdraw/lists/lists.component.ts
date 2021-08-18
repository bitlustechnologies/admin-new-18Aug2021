import { ErrorhandlingService } from './../../../services/errorhandling.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/api';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef, NgbModalOptions, NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormControl } from '@angular/forms';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  config: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  constructor(
    private router: Router,
    private userservice: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private errorhandling: ErrorhandlingService,
    private route: ActivatedRoute
  ) {}
  type:string=''
  isDisabledSlot:boolean = false
  isDisabledToDate:boolean= false
  toDate:Date
  dateToday;
  checkPass: boolean;
  fiatUserlists: any;
  userlists: any;
  total: any;
  page: any = 1;
  fiatpage: any = 1;
  empty: boolean = false;
  fiatempty: boolean = false;
  searchVal: string = '';
  totalRecords: any;
  btnDis: boolean = false;
  msgs: Message[] = [];
  fiatTotal: any;
  fiatTotalRecords: any;
  fiatBankDetail: any;
  googleAuth: any;
  dateSelected;
  selectedTimeSlot: any = '';
  tabActiveId: any = 'tabcrypto';
  filterValues: any={};
  txn_id: any;
  filterOn: boolean = false;
  sizeUpload: any = 5;
  recieptPicture: any;
  sizeExceeded: any;
  tabsequence: boolean = false;

  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('tabSet') tabSet;
  pages: string[] = ['tab1', 'tab2'];
  private modalRef: NgbModalRef;

  ngOnInit() {
    this.dateSelected =
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
    this.dateToday =
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
    this.userservice.cast1.subscribe(checkPass => (this.checkPass = checkPass));
    if (this.checkPass == false) {
      this.getWithdrawList(this.page);
      this.getFiatWithdrawList(this.fiatpage);
    }
    if (this.route.snapshot.params.pendingFilter) {
      let filter = atob(this.route.snapshot.params.pendingFilter);
      if (filter == 'pendingInrwithdraw') {
        // this.tabSet.select(this.pages[1]);
        // this.tabSet.tabs[1].active = true;
        this.tabsequence = true;
        this.tabActiveId = 'tabFiat';
      }
    }
  }

  beforeChange(event: NgbTabChangeEvent) {
    console.log('Changing tab', event);
    this.tabActiveId = event.activeId;
    if (this.tabActiveId == 'tabcrypto') {
      this.getWithdrawList(this.page);
      this.resetFilters();
    } else {
      this.getFiatWithdrawList(this.fiatpage);
      this.resetFilters();
    }
  }

  verify(f) {
    this.userservice.changeValueLoading(1);
    let token = localStorage.getItem('tokenAdmin');
    this.userservice.getuserAllstatusByToken(token).subscribe(response => {
      let googleEnable = response.json().google2fa_active;
      if (googleEnable == 1) {
        this.userservice.verifyGToken(f.value.token).subscribe(
          response => {
            if (response.json().status) {
              this.userservice.changeValueCheckPass(false);
              this.getWithdrawList(this.page);
              this.getFiatWithdrawList(this.fiatpage);
            } else {
              this.googleAuth = '';
              this.toastr.error('An error has been occured', 'Failure!');
            }
            this.userservice.changeValueLoading(0);
          },
          error => {
            this.userservice.changeValueLoading(0);
            this.googleAuth = '';
            this.toastr.error('Invalid token! Please enter valid token.', 'Failure!');
            this.errorhandling.errorHandler(error);
          }
        );
      } else {
        this.userservice.changeValueLoading(0);
        this.toastr.error('Please enable google authentication from profile setting', 'Google Authentication');
      }
    });
  }

  FilterWithdraws(searchForm:NgForm) {
    console.log(searchForm)
    this.userlists = [];
    this.filterValues = searchForm.value;
    let date = new Date(this.filterValues.date);
    let previousDate = new Date(date.setDate(date.getDate() - 1));
    this.filterValues['pdate'] =
      previousDate.getFullYear() +
      '-' +
      (previousDate.getMonth() + 1) +
      '-' +
      (previousDate.getDate() < 10 ? '0' + previousDate.getDate() : previousDate.getDate());

    if (this.tabActiveId == 'tabcrypto') {
      // this.getWithdrawList(this.page);
      this.filteredWithdrawList();
    } else {
      // this.getFiatWithdrawList(this.fiatpage);
      this.filterValues['status'] = 'QUEUE';
      this.filteredFiatWithdrawList();
    }
  }

  onChange( formVal:NgForm){
    if(formVal.value.toDate == undefined){
      this.isDisabledSlot = false
      this.isDisabledToDate = true
    }else{
      this.isDisabledToDate = false
      this.isDisabledSlot = true
    }
  }



  filteredWithdrawList() {
    this.userservice.getSearchedWithdrawList(this.page, this.filterValues).subscribe(
      (res: any) => {
        if (res) {
          this.filterOn = true;
          if (res.json().data) this.empty = false;
          else this.empty = true;
          this.userlists = res.json().data;
          this.total = Math.ceil(res.json().total / 10);
          this.totalRecords = res.json().total;
        }
      },
      err => {
        console.log(err.json());
        this.toastr.error(err.json().message);
      }
    );
  }

  filteredFiatWithdrawList() {
    this.userservice.getSearchedFiatWithdrawList(this.page, this.filterValues).subscribe(
      (res: any) => {
        if (res) {
          this.filterOn = true;
          if (res.json().data) this.empty = false;
          else this.empty = true;
          this.fiatUserlists = res.json().data;
          this.fiatTotal = Math.ceil(res.json().total / 10);
          this.fiatTotalRecords = res.json().total;
        }
      },
      err => {
        console.log(err.json());
        this.toastr.error(err.json().message);
      }
    );
  }


  showAll(e){
    if(e == 'deposit-crypto'){
      let obj = {
        coinId: "all",
        limit: 10,
        offset: 1,
        status: "unconfirmed",
        type: "deposit"
      }
      this.getFiatWithdrawList(this.fiatpage);
      this.getWithdrawList(this.page);

      // this.getDepositList(obj);
    }else{
      let obj = {
        "limit": 10,
        "offset": 1,
        "coinId": "all",
        "status": "CONFIRMED",
        "type": "deposit"
      }
      this.getFiatWithdrawList(this.fiatpage);
      this.getWithdrawList(this.page);

      // this.getUserList(this.page, obj);
    }
  }


  DownloadCSV(data,) {
    if (this.tabActiveId == 'tabcrypto' && !this.tabsequence) {
      this.userservice.getWithdrawListDownload(this.filterValues).subscribe((res:any)=>{
        if(res.json().data.length > 0){

          let resData = res.json().data
          let arr = resData.map((val:any,i)=>{
            resData[i]['date'] = new Date(val.date).toLocaleDateString()
            return val
               })
          this.download(arr, this.type,'withdraw-crypto');  

        // this.download(res.json().data, this.type,'withdraw-crypto')
        }
      })
    } if(this.tabActiveId == 'tabFiat' && !this.tabsequence) {
this.filterValues['status'] = 'QUEUE'
      this.userservice.getFiatWithdrawListDownload(this.filterValues).subscribe(
        (response:any) => {
        if(response.json().data.length > 0){
          let resData = response.json().data
          let arr = resData.map((val:any,i)=>{
            resData[i]['Date'] = new Date(val.Date).toLocaleDateString()
            resData[i]['Time'] = new Date(val.Date).getTime()
            console.log( resData[i]['Time'] = new Date(val.Date).getTime()  )
            return val
               })

          this.download(arr, this.type,'withdraw-fiat')
        }
        })
    }
    if (this.tabActiveId == 'tabcrypto' && this.tabsequence) {
      this.userservice.getWithdrawListDownload(this.filterValues).subscribe((res:any)=>{
        if(res.json().data.length > 0){

          let resData = res.json().data
          let arr = resData.map((val:any,i)=>{
            resData[i]['date'] = new Date(val.date).toLocaleDateString()
            resData[i]['Time'] = new Date(val.Date).getTime()
            console.log( resData[i]['Time'] = new Date(val.Date).getTime()  )
            return val
               })

        this.download(res.json().data, this.type,'withdraw-crypto')
        }
      })
    } if(this.tabActiveId == 'tabFiat' && this.tabsequence) {
this.filterValues['status'] = 'QUEUE'
      this.userservice.getFiatWithdrawListDownload(this.filterValues).subscribe(
        (response:any) => {
        if(response.json().data.length > 0){
          let resData = response.json().data
          let arr = resData.map((val:any,i)=>{
            resData[i]['Date'] = new Date(val.Date).toLocaleDateString()
            return val
               })

          

          this.download(arr, this.type,'withdraw-fiat')
        }
        })
    }
  }

  download(objdata, type,typeOrder) {
    var csvData = this.ConvertToCSV(objdata, type);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    if (type == "xlsx") {
      var blob = new Blob([(csvData)], {
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
    if (type == "xlsx") {
      var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
    } else {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    }
    var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      row += index + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  resetFilters() {
    this.isDisabledToDate = false
    this.isDisabledSlot = false
    this.dateSelected =
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
    this.getWithdrawList(this.page);
    this.selectedTimeSlot = '';
    this.filterOn = false;
  }


  prev() {
    if (this.page != 1) {
      this.page = this.page - 1;
      if (this.filterOn) {
        this.filteredWithdrawList();
      } else {
        this.getWithdrawList(this.page - 1);
      }
    }

    if (this.fiatpage != 1) {
      687075;
      this.getFiatWithdrawList(this.fiatpage - 1);
      this.fiatpage = this.fiatpage - 1;
    }
  }

  next() {
    if (this.page != this.total) {
      this.page = this.page + 1;
      if (this.filterOn) {
        this.filteredWithdrawList();
      } else {
        this.getWithdrawList(this.page + 1);
        this.getFiatWithdrawList(this.fiatpage + 1);
      }
    }
    if (this.fiatpage != this.fiatTotal) {
      this.getFiatWithdrawList(this.fiatpage + 1);
      this.fiatpage = this.fiatpage + 1;
    }
  }

  fiatchangePage(fiatpage) {
    this.fiatpage = fiatpage;
    this.getFiatWithdrawList(fiatpage);
  }

  changePage(page) {
    this.page = page;
    this.getWithdrawList(page);
  }

  goto(val) {
    var tag = val.target;
    var value = Math.floor(parseInt(tag.value));
    if (value >= 1 && value <= this.total) {
      this.getWithdrawList(value);
      this.getFiatWithdrawList(value);
      this.page = value;
    }
  }

  searchData(text) {
    this.page = 1;
    this.searchVal = text;
    this.getWithdrawList(this.page);
    this.getFiatWithdrawList(this.fiatpage);
  }

  getWithdrawList(limit) {
    this.userlists = [];
    this.userservice.getWithdrawList(limit, this.searchVal).subscribe(
      response => {
        if (response.json().data) this.empty = false;
        else this.empty = true;
        this.userlists = response.json().data;
        this.total = Math.ceil(response.json().total / 10);
        this.totalRecords = response.json().total;
      },
      error => {
        this.toastr.error(error.json().message);
      }
    );
  }

  getFiatWithdrawList(limit) {
    let data = {
      status: 'QUEUE'
    };
    this.userservice.getFiatWithdrawList(limit, data).subscribe(
      response => {
        if (response.json().data) this.fiatempty = false;
        else this.fiatempty = true;
        this.fiatUserlists = response.json().data;
        this.fiatTotal = Math.ceil(response.json().total / 10);
        this.fiatTotalRecords = response.json().total;
      },
      error => {
        this.toastr.error(error.json().message);
      }
    );
  }

  viewBankDetail(acc_id, member_id, bank_id) {
    this.userservice.getBankDetail(acc_id, member_id, bank_id).subscribe(
      response => {
        if (response.json().result) this.empty = false;
        else this.empty = true;
        this.fiatBankDetail = response.json().result;
        console.log(this.fiatBankDetail);
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
    this.modalRef = this.modalService.open(this.content);
  }

  changeApprove(content) {
    this.txn_id = '';
    this.modalRef = this.modalService.open(content);
    this.modalRef.result
      .then
      // result => {
      //   this.closeResult = `Closed with: ${result}`;
      // },
      // reason => {
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // }
      ();
  }

  changeFiatApprove(content, acc_num) {
    if (acc_num == '' || acc_num == null) {
      this.toastr.error("This User's bank detail is missing.");
      return false;
    } else {
      this.txn_id = '';
      this.modalRef = this.modalService.open(content, this.config);
      this.modalRef.result
        .then
        // result => {
        //   this.closeResult = `Closed with: ${result}`;
        // },
        // reason => {
        //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // }
        ();
    }
  }

  approveWithdrawRequestStatus(approveForm: NgForm, i) {
    this.userservice.changeValueLoading(1);
    let data = {
      // receiptpicture: this.recieptPicture,
      tid: approveForm.value.txn_id,
      withdraw_id: approveForm.value.withdraw_id
    };

    this.userservice.approveFiatWithdrawReq(data).subscribe(
      response => {
        this.toastr.success(response.json().message, 'Success');
        if (this.fiatpage > 1 && i == 0) {
          this.getFiatWithdrawList(this.fiatpage - 1);
        } else {
          this.getFiatWithdrawList(this.fiatpage);
        }
        setTimeout(() => {
          this.btnDis = false;
        }, 4000);

        setTimeout(() => {
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
      },
      error => {
        setTimeout(() => {
          this.btnDis = false;
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
        this.toastr.error(error.json().message, 'Error');
        this.errorhandling.errorHandler(error);
      }
    );
  }

  disapproveFiatWithdrawReq(wid, reason, i) {
    this.userservice.changeValueLoading(1);
    this.btnDis = true;
    setTimeout(() => {
      this.btnDis = false;
    }, 3500);
    if (!reason) {
      this.userservice.changeValueLoading(0);
      this.toastr.error('Please enter reason', 'Error');
      return false;
    }
    this.userservice.disapproveFiatWithdrawReq(wid, reason).subscribe(
      response => {
        this.toastr.success(response.json().message, 'Success');
        if (this.fiatpage > 1 && i == 0) {
          this.getFiatWithdrawList(this.fiatpage - 1);
        } else this.getFiatWithdrawList(this.fiatpage);
        setTimeout(() => {
          this.btnDis = false;
        }, 4000);
        setTimeout(() => {
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
        // this.getFiatWithdrawList()
      },
      error => {
        setTimeout(() => {
          this.btnDis = false;
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
        this.toastr.error(error.json().message, 'Error');
        this.errorhandling.errorHandler(error);
      }
    );
  }

  changeStatus(wid, status, reason, i) {
    this.userservice.changeValueLoading(1);
    this.btnDis = true;
    setTimeout(() => {
      this.btnDis = false;
    }, 3500);

    if (status == 0) {
      if (!reason) {
        this.userservice.changeValueLoading(0);
        this.toastr.error('Please enter reason', 'Error');
        return false;
      }
    } else {
      reason = '';
    }

    this.userservice.changeWithdrawStatus(status, wid, reason).subscribe(
      response => {
        this.toastr.success(response.json().message, 'Success');
        if (this.page > 1 && i == 0) {
          this.getWithdrawList(this.page - 1);
        } else {
          this.getWithdrawList(this.page);
        }

        setTimeout(() => {
          this.btnDis = false;
        }, 4000);

        setTimeout(() => {
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
      },
      error => {
        setTimeout(() => {
          this.btnDis = false;
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
        this.toastr.error(error.json().message, 'Error');
        this.errorhandling.errorHandler(error);
      }
    );
  }

  uploadreceipt(event) {
    this.sizeExceeded = false;
    this.recieptPicture = event.target.files[0];
    this.validateFile(this.recieptPicture.name, 'photo', this.recieptPicture.size);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
    }
  }

  validateFile(name: String, typeis, size) {
    size = Math.round(size / 1000) / 1024;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (typeis == 'photo') {
      if (
        ext.toLowerCase() == 'png' ||
        ext.toLowerCase() == 'jpg' ||
        ext.toLowerCase() == 'jpeg' ||
        ext.toLowerCase() == 'tiff' ||
        ext.toLowerCase() == 'tif' ||
        ext.toLowerCase() == 'gif' ||
        ext.toLowerCase() == 'raw'
      ) {
        if (size <= this.sizeUpload) {
          return true;
        } else {
          this.sizeExceeded = true;
          this.toastr.error(`picture size should be less than ${this.sizeUpload}Mb.`, 'error');
          return false;
        }
      } else {
        this.toastr.error(`Profile image format should be .png, .jpg, .gif, or tiff.`, 'error');
        return false;
      }
    }
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
