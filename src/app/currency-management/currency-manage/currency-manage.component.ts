import { ErrorhandlingService } from './../../services/errorhandling.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyService } from '../../services/currency.service';
import {Router, NavigationExtras} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-manage',
  templateUrl: './currency-manage.component.html',
  styleUrls: ['./currency-manage.component.scss']
})

export class CurrencyManageComponent implements OnInit {

  @ViewChild('content') content: TemplateRef<any>;
  modalRef: NgbModalRef;
  currencyManageList:any[]=[];
  navigationExtras: NavigationExtras;
  password:any='';
  googleAuth:any;

  constructor(private modalService: NgbModal,private currencyservice: CurrencyService,
    private router: Router,private toastr: ToastrService, private userservice: UserService,
    private errorhandling:ErrorhandlingService) { }

  public onEdit(list) {
    this.navigationExtras={
      queryParams: {
        "currencyId":list.currency_id,
        "withdrawFee": list.withdrawFee,
        "minWithdrawAmount": list.minWithdrawAmount,
        "withdrawLimitWithKyc":list.withdrawLimitKyc,
        "withdrawLimitWithoutKyc": list.kyc_max_withd_without
      }
    };
    this.password='';
    this.modalRef = this.modalService.open(this.content);
  }

  ngOnInit() {
    this.getCurrencyManageList();
  }

  SubmitPassword(f) {
    this.userservice.changeValueLoading(1);
    let token = localStorage.getItem('tokenAdmin');

    this.userservice.getuserAllstatusByToken(token)
      .subscribe(response => {
        let googleEnable = response.json().google2fa_active
        if(googleEnable == 1)
        {
          this.userservice.verifyGToken(f.value.token)
          .subscribe(response => {
            if(response.json().status)
            {
              this.userservice.changeValueCheckPass(false);
              this.modalRef.close();
              this.toastr.success('Successfully Verified');
              this.router.navigate(['/currency-management/edit-fee-limit'], this.navigationExtras);
            }
            else
            {
              this.googleAuth = "";
              this.toastr.error('An error has been occured', 'Failure!');
            }
            this.userservice.changeValueLoading(0);
          },(error)=>{
            this.userservice.changeValueLoading(0);
            this.googleAuth = "";
            this.toastr.error('Invalid token! Please enter valid token.', 'Failure!');
            this.errorhandling.errorHandler(error)
          })
        }
        else{
          this.userservice.changeValueLoading(0);
          this.toastr.error('Please enable google authentication from profile setting', 'Google Authentication');
        }
      });



    
    
    
    
    
    // if(this.password == localStorage.getItem('adminPass'))
    // {
    //   this.modalRef.close();
    //   this.toastr.success('Successfully Verified');
    //   this.router.navigate(['/currency-management/edit-fee-limit'], this.navigationExtras);
    // }  
    // else
    // {
    //   this.toastr.error('Invalid Password', 'Please enter right password');
    // }
  }

  getCurrencyManageList()
  { 
    this.currencyservice.getCurrencyManageList()
    .subscribe(response => {
      console.log(response)
      if(response.status){
        if(response.data.length> 0){
          // this.currencyManageList= response.data;
          this.currencyManageList = 	response.data.filter(x => x.is_fiat_currency == 0)
        }
      }
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }

  closePopup()
  {
    this.modalRef.close();
  }

}