import { NavigationExtras } from '@angular/router';
import { ErrorhandlingService } from './../../services/errorhandling.service';
import { CurrencyService } from './../../services/currency.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-symbols',
  templateUrl: './currency-symbols.component.html',
  styleUrls: ['./currency-symbols.component.css']
})
export class CurrencySymbolsComponent implements OnInit {
  empty:boolean=false;
  currencyList:any[]=[]
  navigationExtras: NavigationExtras;
  constructor(private currencyservice: CurrencyService, 
    private errorhandling:ErrorhandlingService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getActiveCurrency();
  }

  getActiveCurrency(){
    this.currencyservice.getActiveCurrency()
    .subscribe(response => {
      if(response.data.length){
        this.empty = false;
        this.currencyList= response.data;
      }
      else
      {
        this.empty = true; 
        this.currencyList = [];
      }
        
    },(error)=>{
      this.errorhandling.errorHandler(error)
    });
  }

  editCurrency(currency_id)
  {
    this.navigationExtras= {
      queryParams: {
          "currency_id":currency_id          // "orderType":'BUY'
      }
  };
    this.router.navigate(['/currency-management/edit-currency-symbols'], this.navigationExtras);
  }

}
