import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Bank } from '../../shared/models/bank.model';
import { CurrencyService } from '../../services/currency.service';
import { ErrorhandlingService } from '../../services/errorhandling.service';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.scss']
})
export class BankEditComponent implements OnInit {
  bankModel: Bank = new Bank();
  btnDisable: boolean = false;
  bank_id: any;

  fiatCurrency: any[] = [];
  selectedCurr: any = '';
  pay_type: any = 'bank';
  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router,
    private currencyservice: CurrencyService,
    private errorhandling: ErrorhandlingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getFiatCurrency();

    this.route.params.subscribe(params => {
      this.bank_id = params['id'];
      this.paymentService.getBankById(this.bank_id).subscribe(
        (response: any) => {
          let result = response.json().result[0];
          // console.log("result object ", result.account_name)
          // console.log("result array ", result['account_name'])
          this.bankModel.name = result.account_name;
          this.bankModel.account_number = result.account_number;
          this.bankModel.bank_name = result.bank_name;
          this.bankModel.branch = result.bank_branch;
          this.bankModel.bank_code = result.bank_code;
          this.bankModel.routing_code = result.branch_routing_code;
          this.bankModel.routing_method = result.routing_method;
          this.bankModel.ifsc_code = result.ifsc_code;
          this.bankModel.currency_id = result.currency_id;
          this.bankModel.phone_number = result.phone_number;
          this.bankModel.pay_type = result.type;
          this.selectedCurr = result.currency_symbol;
        },
        error => {}
      );
    });
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
    this.bankModel.pay_type = type;
  }

  editBank(bankForm) {
    this.btnDisable = true;
    let postData = {
      account_number: bankForm.value.account_number,
      bank_name: bankForm.value.bank_name,
      bank_code: bankForm.value.bank_code,
      branch: bankForm.value.branch,
      ifsc_code: bankForm.value.swift_code,
      currency_id: 12
    };
    // if(bankForm.value.typeRad == 'pesalink')
    // {
    //   postData['phone_number'] = bankForm.value.phone_number
    // }

    this.paymentService.editBank(postData, this.bank_id).subscribe(
      response => {
        this.toastr.success(response.json().message, response.json().message);
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
