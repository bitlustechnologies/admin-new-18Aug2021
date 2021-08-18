import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { CurrencyPairEditModel } from '../../shared/models/currency-pair-edit-model';
import { CurrencyService } from '../../services/currency.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-pairs-fee-edit',
  templateUrl: './currency-pairs-fee-edit.component.html',
  styleUrls: ['./currency-pairs-fee-edit.component.css']
})
export class CurrencyPairsFeeEditComponent implements OnInit {

  userid: any;
  currencyPairEditModel:CurrencyPairEditModel=new CurrencyPairEditModel();
  // obj = { pairId: '',minTradeLimit: '',tradeFee:'', orderType:''};
     obj = { pairId: '',minTradeLimit: '',tradeFee:''};
  constructor(private route: Router, private _route: ActivatedRoute, 
    private toastr: ToastrService, private currencyservice: CurrencyService,
    private errorhandling:ErrorhandlingService) {
    this._route.queryParams.subscribe(params => {
      this.currencyPairEditModel.pairId = params["pairId"];
      this.currencyPairEditModel.minTradeLimit = params["minTradeLimit"];
      this.currencyPairEditModel.sellTradeFee = params["sellTradeFee"];
      this.currencyPairEditModel.buyTradeFee = params["buyTradeFee"];
      this.currencyPairEditModel.tradeFee = params["tradeFee"];
      // this.currencyPairEditModel.orderType = params["orderType"];
  });
  }

  ngOnInit() {

  }
   UpdateUser(editForm: NgForm): void {
     
      this.obj.pairId=this.currencyPairEditModel.pairId;
      this.obj.minTradeLimit=this.currencyPairEditModel.minTradeLimit;
      this.obj.tradeFee=this.currencyPairEditModel.tradeFee;
      // this.obj.orderType=this.currencyPairEditModel.orderType;
      this.currencyservice.updateCurrencyPairItem(this.obj)
          .subscribe(response => {
            if(response.status){
              this.toastr.success("Updated Successfully.");
              this.route.navigate(['/currency-management/currency-pairs']);
          }
            
          },(error)=>{
            // this.userservice.changeValueLoading(0);
            this.errorhandling.errorHandler(error)
          })
    }
    onChange(deviceValue) {
      if(deviceValue=='SELL'){
        this.currencyPairEditModel.tradeFee=this.currencyPairEditModel.sellTradeFee;
      }
      else{
        this.currencyPairEditModel.tradeFee=this.currencyPairEditModel.buyTradeFee;
      }
  }
}
