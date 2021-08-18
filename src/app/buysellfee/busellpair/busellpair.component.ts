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
  currencyPairsList: any[] = [];
  currencyPairsListFull: any[] = [];
  fiatCurrency: any[] = [];
  @ViewChild('content') content: TemplateRef<any>;
  modalRef: NgbModalRef;
  navigationExtras: NavigationExtras;
  password: any = '';
  constructor(
    private modalService: NgbModal,
    private currencyservice: CurrencyService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public onEdit(list) {
    this.navigationExtras = {
      queryParams: {
        pairId: list.pair_id // "orderType":'BUY'
      }
    };
    this.password = '';
    this.modalRef = this.modalService.open(this.content);
  }

  ngOnInit() {
    this.getFiatCurrency();
    this.getCurrencyPairsList();
  }

  SubmitPassword() {
    if (this.password == localStorage.getItem('adminPass')) {
      this.modalRef.close();
      this.toastr.success('Successfully Verified');
      this.router.navigate(['/buysell-fee/buysell-fee-edit'], this.navigationExtras);
    } else {
      this.toastr.error('Invalid Password', 'Please enter right password');
    }
  }

  getFiatCurrency() {
    this.currencyservice.getFiatCurrencyApi().subscribe(
      response => {
        this.fiatCurrency = response;
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
            this.currencyPairsList = this.currencyPairsListFull.filter(x => x.fiat_id == 8);
          }
        }
      },
      error => {}
    );
  }

  onChange(currencyValue) {
    this.currencyPairsList = this.currencyPairsListFull.filter(x => x.fiat_id == currencyValue);
  }
}
