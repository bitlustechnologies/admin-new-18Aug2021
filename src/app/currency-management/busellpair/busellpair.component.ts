import { ErrorhandlingService } from './../../services/errorhandling.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationExtras, Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-busellpair',
  templateUrl: './busellpair.component.html',
  styleUrls: ['./busellpair.component.scss']
})
export class BusellpairComponent implements OnInit {
  defaultCurrency: any;
  currencyPairsList: any[] = [];
  currencyPairsListFull: any[] = [];
  fiatCurrency: any[] = [];
  googleAuth: any;

  @ViewChild('content') content: TemplateRef<any>;
  modalRef: NgbModalRef;
  navigationExtras: NavigationExtras;
  password: any = '';
  constructor(
    private modalService: NgbModal,
    private currencyservice: CurrencyService,
    private router: Router,
    private toastr: ToastrService,
    private userservice: UserService,
    private errorhandling: ErrorhandlingService
  ) {}

  public onEdit(list) {
    this.navigationExtras = {
      queryParams: {
        pairId: list.bs_pair_id // "orderType":'BUY'
      }
    };
    this.password = '';
    this.modalRef = this.modalService.open(this.content);
  }

  ngOnInit() {
    this.getDefaultFiatCurrency();
  }

  getDefaultFiatCurrency() {
    this.currencyservice.adminDefaultCurrency().subscribe(
      response => {
        console.log(response)
        this.defaultCurrency = response.data[0].currency_id;
        this.getFiatCurrency();
        this.getCurrencyPairsList();
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }

  SubmitPassword(f) {
    this.userservice.changeValueLoading(1);
    let token = localStorage.getItem('tokenAdmin');

    this.userservice.getuserAllstatusByToken(token).subscribe(response => {
      let googleEnable = response.json().google2fa_active;
      if (googleEnable == 1) {
        this.userservice.verifyGToken(f.value.token).subscribe(
          response => {
            if (response.json().status) {
              this.userservice.changeValueCheckPass(false);
              this.modalRef.close();
              this.toastr.success('Successfully Verified');
              this.router.navigate(['currency-management/buysell-fee-edit'], this.navigationExtras);
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

    // if(this.password == localStorage.getItem('adminPass'))
    //   {
    //     this.modalRef.close();
    //     this.toastr.success('Successfully Verified');
    //     this.router.navigate(['currency-management/buysell-fee-edit'], this.navigationExtras);
    //   }
    //   else
    //   {
    //     this.toastr.error('Invalid Password', 'Please enter right password');
    //   }
  }

  getFiatCurrency() {
    this.currencyservice.getFiatCurrencyApi().subscribe(
      response => {
        this.fiatCurrency = response.data.filter(x => x.is_fiat_currency == 1);
      },
      error => {}
    );
  }

  getCurrencyPairsList() {
    this.currencyservice.getBuySellPairsList().subscribe(
      response => {
        console.log(response)
        if (response.status) {
          if (response.data.length > 0) {
            this.currencyPairsListFull = response.data;
            this.currencyPairsList = this.currencyPairsListFull.filter(x => x.fiat_id == this.defaultCurrency);
          }
        }
      },
      error => {
        this.errorhandling.errorHandler(error);
      }
    );
  }

  onChange(currencyValue) {
    this.currencyPairsList = this.currencyPairsListFull.filter(x => x.fiat_id == currencyValue);
  }

  closePopup() {
    this.modalRef.close();
  }
}
