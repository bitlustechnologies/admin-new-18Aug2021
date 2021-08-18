import { ErrorhandlingService } from './../../services/errorhandling.service';
import { CurrencyService } from './../../services/currency.service';
import { Component, OnInit } from '@angular/core';
import { BuysellService } from '../../services/buysell.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listData :any[] =[];
  defaultCurrency:any={};
  coinprice:any;
  constructor(
    private buysellService:BuysellService,
    private currencyservice: CurrencyService,
    private errorhandling:ErrorhandlingService
  ) { }

  ngOnInit() {
    this.getDefaultCurrency();
    this.getList();

    this.coinprice = interval(5000).subscribe(x => {
      this.getList();
    });
  }

  ngOnDestroy() {
    // clearInterval(this.coinprice);
    this.coinprice.unsubscribe();
  }

  getDefaultCurrency()
  { 
    this.currencyservice.adminDefaultCurrency()
      .subscribe(response => {
        this.defaultCurrency = response.data[0];
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

  getList(){
    this.buysellService.getpriceList().subscribe(res=>{
      this.listData = res.json().data;
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }
}
