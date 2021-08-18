import { ErrorhandlingService } from './../../services/errorhandling.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { CurrencyManageEditModel } from '../../shared/models/currency-manage-edit.model';
import { CurrencyService } from '../../services/currency.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-fee-limit',
  templateUrl: './edit-fee-limit.component.html',
  styleUrls: ['./edit-fee-limit.component.css']
})
export class EditFeeLimitComponent implements OnInit {

  userid: any;
  currencyManageEditModel:CurrencyManageEditModel=new CurrencyManageEditModel();
  
  constructor(private route: Router, private _route: ActivatedRoute, 
    private toastr: ToastrService, private currencyservice: CurrencyService, 
    private userservice: UserService, private errorhandling:ErrorhandlingService) {
    this._route.queryParams.subscribe(params => {
      this.currencyManageEditModel.currencyId = params["currencyId"];
      this.currencyManageEditModel.withdrawFee = params["withdrawFee"];
      this.currencyManageEditModel.minWithdrawAmount = params["minWithdrawAmount"];
      this.currencyManageEditModel.withdrawLimitWithoutKyc = params["withdrawLimitWithoutKyc"];
      this.currencyManageEditModel.withdrawLimitWithKyc = params["withdrawLimitWithKyc"];
  });
  }

  ngOnInit() {

  }
  UpdateUser(editForm: NgForm) {
    this.userservice.changeValueLoading(1);
    if(this.currencyManageEditModel.withdrawFee)
    {
      if(this.currencyManageEditModel.minWithdrawAmount<=this.currencyManageEditModel.withdrawFee)
      {
        this.userservice.changeValueLoading(0);
        this.toastr.error("Minimum withdraw amount should be greater than withdraw fees.");
        return false;
      }
    }
    this.currencyservice.updateCurrencyItem(this.currencyManageEditModel)
        .subscribe(response => {
          if(response.status){
            this.toastr.success("Updated Successfully.");
            this.userservice.changeValueLoading(0);
            this.route.navigate(['/currency-management/currency-manage']);
        }
          
        },(error)=>{
          this.userservice.changeValueLoading(0);
          this.errorhandling.errorHandler(error)
        })
   
  }
}
