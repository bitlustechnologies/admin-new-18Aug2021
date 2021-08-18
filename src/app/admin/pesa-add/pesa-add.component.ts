import { Component, OnInit ,ViewChild, TemplateRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesa-add',
  templateUrl: './pesa-add.component.html',
  styleUrls: ['./pesa-add.component.css']
})
export class PesaAddComponent implements OnInit {
  countryCodeList: any;
  btnDisable:boolean=false;
  constructor(private paymentService:PaymentService,
    private toastr: ToastrService,
    private router:Router,
    private userService:UserService) { }

  ngOnInit() {
    this.userService.fetCountryCodes()
    .subscribe(response => {
      this.countryCodeList = response.json().data;
    });
  }

  createPesa(pesaForm: NgForm){
    this.btnDisable = true

    let postData  = {
                      'account_number':pesaForm.value.account_number, 
                      'country_code':pesaForm.value.country_code, 
                      'phone_number':pesaForm.value.phone_number, 
                      'type':"pesalink"
                    }

    this.paymentService.addBank(postData)
    .subscribe(response => {
      if(response.json().success)
      {
        this.toastr.success(response.json().message, response.json().message);
      }
      else
      {
        this.toastr.error(response.json().message, response.json().message);
      }
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
