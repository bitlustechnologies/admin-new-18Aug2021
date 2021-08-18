import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyService } from '../../services/currency.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-pairs',
  templateUrl: './currency-pairs.component.html',
  styleUrls: ['./currency-pairs.component.scss']
})
export class CurrencyPairsComponent implements OnInit {
  currencyPairsList: any[] = [];
  @ViewChild('content') content: TemplateRef<any>;
  modalRef: NgbModalRef;
  navigationExtras: NavigationExtras;
  password: any = '';
  constructor(
    private modalService: NgbModal,
    private currencyservice: CurrencyService,
    private router: Router,
    private toastr: ToastrService,
    private errorhandling: ErrorhandlingService
  ) {}

  public onEdit(list) {
    this.navigationExtras = {
      queryParams: {
        pairId: list.tarding_pair_id,
        minTradeLimit: list.minTradeLimit,
        sellTradeFee: list.sellTradeFee,
        buyTradeFee: list.buyTradeFee,
        tradeFee: list.buyTradeFee
        // "orderType":'BUY'
      }
    };
    this.password = '';
    this.modalRef = this.modalService.open(this.content);
  }

  ngOnInit() {
    this.getCurrencyPairsList();
  }

  SubmitPassword() {
    if (this.password == localStorage.getItem('adminPass')) {
      this.modalRef.close();
      this.toastr.success('Successfully Verified');
      this.router.navigate(['/currency-management/currency-pairs-fee-edit'], this.navigationExtras);
    } else {
      this.toastr.error('Invalid Password', 'Please enter right password');
    }
  }

  getCurrencyPairsList() {
    console.log(1)
    this.currencyservice.getCurrencyPairsList().subscribe(
      response => {
        if (response.status) {
    console.log(response)

          if (response.data.length > 0) {
            this.currencyPairsList = response.data;
          }
        }
      },
      error => {
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }
}
