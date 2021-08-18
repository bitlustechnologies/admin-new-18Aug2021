import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LiquidityModel } from '../../shared/models/liquidity.model';
import { BuysellService } from '../../services/buysell.service';
import { CurrencyService } from '../../services/currency.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-liquidity-management',
  templateUrl: './liquidity-management.component.html',
  styleUrls: ['./liquidity-management.component.scss']
})
export class LiquidityManagementComponent implements OnInit {
  liquidityModel:LiquidityModel= new LiquidityModel;
  exchangesList:any[]=[];
  exchangeData :any[]=[];
  orderHistoryList:any[]=[];
  orderLimit:number = 10;
  orderPage : any =1;
  ordertotal : any;
  isSearch : boolean= false;
  pairId : any='';
  orderType:any='';
  currencyPairsList:any[]=[];
  currencyAddress:any[]=[];
  emptyAddress:boolean = true; 
  constructor(
    private  buySellService : BuysellService,
    private currencyservice: CurrencyService,
    private toastr: ToastrService,
    private errorhandling:ErrorhandlingService
  ) {}

  ngOnInit() {
    this.buySellService.getExchanges().subscribe(res=>{
      if( res.json().data.length > 0){
        this.exchangesList  = res.json().data;
      }
    });
    this.buySellService.getorderPlacement().subscribe(res=>{
      this.liquidityModel =   res.json().data;
    });
    this.getOrderHistory();
    this.getCurrencyPairsList();
  }

  getCurrencyPairsList()
  { 
    this.currencyservice.getBuySellPairsList()
      .subscribe(response => {
        if(response.status){
          if(response.data.length> 0){
            this.currencyPairsList = response.data;
          }
        }
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

  getOrderHistory(){
    this.buySellService.getLiquidHistory(this.orderPage,this.orderLimit,this.pairId,this.orderType,this.isSearch).subscribe(res=>{
      this.orderHistoryList = res.json().data.rows;
      this.ordertotal = res.json().data.count;
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }

  updateliquidForm(orderPlacementForm: NgForm){
    var liquidity_mode =  orderPlacementForm.value.customRadio;
    var liquidity_mode_type = orderPlacementForm.value.customRadioX;
    var liquidity_day_interval = orderPlacementForm.value.liquidity_day_interval;

    let obj = {
      liquidityMode : liquidity_mode,
      liquidityModeType:liquidity_mode_type,
      interval : liquidity_day_interval

    }
    this.buySellService.updateOrderPlacement(obj).subscribe(res=>{
      this.toastr.success("Data updated successfully", 'Updated');
    },(error)=>{
      this.toastr.error(error.json().message, 'Error');
      this.errorhandling.errorHandler(error)
    });
  }

  AddExchangeDetail(exchangeForm: NgForm):void{
    if( this.liquidityModel.makeitDefault == true){
        var ex_status = 'active';
        var is_default = '1';
    }else{
      var ex_status = 'inactive';
      var is_default = '0';
    }
    
    let obj = {
      exchange_label:exchangeForm.value.exchangeLabel,
      api_key:exchangeForm.value.apiKey,
      secret_key:exchangeForm.value.secretKey,
      is_default:is_default,
      ex_status:ex_status
    }
    this.buySellService.updateExchange(obj,this.liquidityModel.exchange).subscribe(res=>{
      this.toastr.success("Data updated successfully", 'Updated');
    },(error)=>{
      this.toastr.error(error.json().message, 'Error');
      this.errorhandling.errorHandler(error)
    });
  }

  getExchangeDetails(){
    this.buySellService.getExchanges(this.liquidityModel.exchange).subscribe(res=>{
      if( res.json().data){
        this.liquidityModel.exchangeLabel = res.json().data.exchange_label;
        this.liquidityModel.apiKey = res.json().data.api_key;
        this.liquidityModel.secretKey = res.json().data.secret_key;
        if(res.json().data.is_default == 1){
          this.liquidityModel.makeitDefault = true;
        }else{
          this.liquidityModel.makeitDefault = false;
        }
        
        if(res.json().data.buy_sell_exchanges_addresses.length > 0 ){
          for( let i =0 ; i < res.json().data.buy_sell_exchanges_addresses.length;i++ ){
            if(res.json().data.buy_sell_exchanges_addresses[i].currency_master.is_fiat_currency != 1)
            {
              this.currencyAddress.push(res.json().data.buy_sell_exchanges_addresses[i])
            }
              // if(res.json().data.buy_sell_exchanges_addresses[i].currency_master.currency_symbol == "btc"){
                //   this.liquidityModel.btcAddress = res.json().data.buy_sell_exchanges_addresses[i].address;
                // }
                // if(res.json().data.buy_sell_exchanges_addresses[i].currency_master.currency_symbol == "eth"){
                  //   this.liquidityModel.ethAddress = res.json().data.buy_sell_exchanges_addresses[i].address;
                  // }
          }
          if(this.currencyAddress.length > 0)
          {
            this.emptyAddress = false;
          }
          else{
            this.emptyAddress = true;
          }
        }
      }
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }

  changePage(page){
    this.orderPage = page;
    this.getOrderHistory();
  }

  FilterOrders(data : NgForm){
    this.orderPage = 1;
    this.isSearch = true;
    this.pairId = data.value.pairId;
    this.orderType  = data.value.orderType
    this.getOrderHistory();
  }

  selectManual()
  {
    this.liquidityModel.liquidity_mode_type = '';
  }

  selectAuto()
  {
    this.liquidityModel.liquidity_mode_type = 'ORDER_FOR_ORDER';
  }
  
  selectOrder()
  {
    this.liquidityModel.liquidity_mode = 'AUTO';
  }
}
