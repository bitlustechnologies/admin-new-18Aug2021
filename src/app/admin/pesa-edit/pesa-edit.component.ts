import { Component, OnInit ,ViewChild, TemplateRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Bank } from '../../shared/models/bank.model';

@Component({
  selector: 'app-pesa-edit',
  templateUrl: './pesa-edit.component.html',
  styleUrls: ['./pesa-edit.component.css']
})
export class PesaEditComponent implements OnInit {
  bankModel:Bank= new Bank;
  btnDisable:boolean=false;
  pesa_id:any;
  countryCodeList:any=[];
  constructor(private paymentService:PaymentService,
    private toastr: ToastrService,
    private router:Router,
    private route: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pesa_id = params['id']
      this.paymentService.getBankById(this.pesa_id)
      .subscribe((response:any) => {
          let result = response.json().result;
          this.bankModel.account_number = result.account_number;
          this.bankModel.phone_number = result.phone_number;
          this.bankModel.country_code = result.country_code;
      },(error)=>{
      }) 
    });

    this.userService.fetCountryCodes()
    .subscribe(response => {
      this.countryCodeList = response.json().data;
    });
  }

  editPesa(pesaForm){
    this.btnDisable = true

    let postData  = {
                      'account_number':pesaForm.value.account_number, 
                      'phone_number':pesaForm.value.phone_number, 
                      'country_code':pesaForm.value.country_code, 
                      'type':"pesalink"
                    }

    this.paymentService.editBank(postData, this.pesa_id)
    .subscribe(response => {
      this.toastr.success(response.json().message, response.json().message);
      setTimeout(() => {
        this.router.navigate(['/admin/banks']);
      }, 1000);
    },(error)=>{
      this.btnDisable=false
      if(error.json().message != '')
        this.toastr.error(error.json().message, 'Error');
      else
        this.toastr.error('An error has been occured', 'Error');
    })
  }

}
