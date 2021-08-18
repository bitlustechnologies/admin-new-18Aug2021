import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { ErrorhandlingService } from '../../services/errorhandling.service';

@Component({
  selector: 'app-bank-add',
  templateUrl: './bank-add.component.html',
  styleUrls: ['./bank-add.component.css']
})
export class BankAddComponent implements OnInit {
  btnDisable: boolean = false;
  fiatCurrency: any[] = [];
  selectedCurr: any = '';
  pay_type: any = 'bank';
  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private currencyservice: CurrencyService,
    private errorhandling: ErrorhandlingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFiatCurrency();
  }

  getFiatCurrency() {
    this.currencyservice.getFiatCurrencyApi().subscribe(
      response => {
        this.fiatCurrency = response.data.filter(x => x.is_fiat_currency == 1);
      },
      error => {
        this.errorhandling.errorHandler(error);
      }
    );
  }

  doSelectCurrency(currency_id) {
    let curr = this.fiatCurrency.filter(x => x.currency_id == currency_id);
    this.selectedCurr = curr[0].currency_symbol;
  }

  selectRadType(type) {
    this.pay_type = type;
  }

  createBank(bankForm: NgForm) {
    this.btnDisable = true;

    let postData = {
      account_number: bankForm.value.account_number,
      bank_name: bankForm.value.bank_name,
      branch: bankForm.value.branch,
      ifsc_code: bankForm.value.ifsc_code,
      currency_id: 12
    };

    // if (bankForm.value.typeRad == 'pesalink') {
    //   postData['phone_number'] = bankForm.value.phone_number;
    // }
    this.paymentService.addBank(postData).subscribe(
      response => {
        if (response.json().success) {
          this.toastr.success(response.json().message, response.json().message);
        } else {
          this.toastr.error(response.json().message, response.json().message);
        }
        setTimeout(() => {
          this.router.navigate(['/admin/banks']);
        }, 1000);
      },
      error => {
        this.btnDisable = false;
        if (error.json().message != '') this.toastr.error(error.json().message, 'Error');
        else this.toastr.error('An error has been occured', 'Error');
      }
    );
  }
}
