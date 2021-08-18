import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPairEditModel } from '../../shared/models/currency-pair-edit-model';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../../services/currency.service';
import { BuySellPairEditModel } from '../../shared/models/buysell-pair-edit-model';

@Component({
  selector: 'app-busellpair-fee-edit',
  templateUrl: './busellpair-fee-edit.component.html',
  styleUrls: ['./busellpair-fee-edit.component.css']
})
export class BusellpairFeeEditComponent implements OnInit {

  userid: any;
  typetext:any
  pairId:any

  BuySellPairEditModel:BuySellPairEditModel=new BuySellPairEditModel();
  // obj = { pairId: '',minTradeLimit: '',tradeFee:'', orderType:''};
     obj = { pair_id: '',fee: '',orderLimit:'' ,feeType:'' ,otype:''};
  constructor(private route: Router, private _route: ActivatedRoute, private toastr: ToastrService, private currencyservice: CurrencyService) {
    this._route.queryParams.subscribe(params => {
      this.BuySellPairEditModel.pair_id = params["pairId"];
      this.pairId = params["pairId"];
      
      // this.currencyPairEditModel.minTradeLimit = params["minTradeLimit"];
      // this.currencyPairEditModel.sellTradeFee = params["sellTradeFee"];
      // this.currencyPairEditModel.buyTradeFee = params["buyTradeFee"];
      // this.currencyPairEditModel.tradeFee = params["tradeFee"];
      // this.currencyPairEditModel.orderType = params["orderType"];
  });
  }

  ngOnInit() {
   this.typetext = 'buy'
   this.getDetails(this.pairId,this.typetext) 
  }

  getDetails(pairid,type)
  {
    
    this.currencyservice.getDetails(pairid,type)
    .subscribe(response => {

       this.BuySellPairEditModel.fee = response.data[0].fee;
       this.BuySellPairEditModel.orderLimit = response.data[0].orderLimit;
       this.BuySellPairEditModel.feeType = response.data[0].fee_type;
       this.BuySellPairEditModel.otype = type
      
    },(error)=>{
    })

  }
 
   UpdateUser(editForm: NgForm): void {
     
      this.obj.pair_id=this.BuySellPairEditModel.pair_id;
      this.obj.fee=this.BuySellPairEditModel.fee;
      this.obj.orderLimit=this.BuySellPairEditModel.orderLimit;
      this.obj.feeType=this.BuySellPairEditModel.feeType;
      this.obj.otype = this.typetext

      // this.obj.orderType=this.currencyPairEditModel.orderType;
      this.currencyservice.updateBuySellPairItem(this.obj)
          .subscribe(response => {
            if(response.status){
              this.toastr.success("Updated Successfully.");
              this.route.navigate(['/buysell-fee']);
          }
            
          },(error)=>{
          })
     
    }

    onChange(deviceValue) {
      if(deviceValue=='SELL'){
        // this.BuySellPairEditModel.tradeFee=this.currencyPairEditModel.sellTradeFee;
      }
      else{
        // this.currencyPairEditModel.tradeFee=this.currencyPairEditModel.buyTradeFee;
      }
  }

  changeType()
  {

    this.getDetails(this.pairId,this.typetext) 


  }

  

}
