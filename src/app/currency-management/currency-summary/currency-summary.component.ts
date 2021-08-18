import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
// declare var require: any;
// const data: any = require('./company.json');

@Component({
  selector: 'app-currency-summary',
  templateUrl: './currency-summary.component.html',
  styleUrls: ['./currency-summary.component.scss']
})
export class CurrencySummaryComponent implements OnInit {
  empty:boolean=false;
  currencySummaryList:any[]=[]
  total:any;
  pageNo:any=0;
  totalRecords:any;
  type:string='';
  defaultCurrency:any;
  constructor(private currencyservice: CurrencyService,private errorhandling:ErrorhandlingService) { }

  ngOnInit() {
    this.getCurrencySummary();
    this.currencyservice.adminDefaultCurrency()
      .subscribe(response => {
        this.defaultCurrency = response.data[0];
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

  getCurrencySummary(){
    this.currencyservice.getCurrencySummary()
        .subscribe(response => {
        if(response.total> 0){
          this.empty = false;
          // response.data.splice(3, 2);
          this.currencySummaryList= response.data;
          this.totalRecords=response.total-1;
          this.total=this.totalRecords/10;
        }
        else
        {
          this.empty = true; 
          this.totalRecords =0;
          this.currencySummaryList = [];
        }
        },(error)=>{
          // this.userservice.changeValueLoading(0);
          this.errorhandling.errorHandler(error)
        })
  }

  DownloadCSV(){
    this.currencyservice.getCurrencySummary()
    .subscribe(response => {
      if(response.status){
            if(response.total> 0){
              // response.data.splice(5, 1);
               this.download(response.data,this.type);
            }
    }
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }
  
  download(objdata,type){
    var csvData = this.ConvertToCSV(objdata,type);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    if(type=="xlsx"){
      var blob = new Blob([(csvData)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var url= window.URL.createObjectURL(blob);
      a.href = url; 
      a.download = 'Currency-summary.xlsx';
    }else{
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Currency-summary.csv';
    }
    a.click();
  }
  
  ConvertToCSV(objArray,type) {
  if(type=="xlsx"){
    var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
  }else{
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  }
  var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
  var str = '';
  var row = "";
  for (var index in objArray[0]) {
      row += index + ',';
  }
  row = row.slice(0, -1);
  str += row + '\r\n';
  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','
          line += array[i][index];
      }
      str += line + '\r\n';
  }
  return str;
  }

}
