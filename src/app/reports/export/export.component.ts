import { Component, OnInit } from '@angular/core';
import * as alasql from '../../../assets/js/alasql.min.js';
import { CurrencyService } from '../../services/currency.service.js';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service.js';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  searchForm
  filterParam:any
  type:any
  constructor(private currencyservice : CurrencyService ,private fb : FormBuilder,private userservice :UserService) {
     this.searchForm = this.fb.group({
       fromDate:[new Date().toISOString().split('T')[0]],
       toDate : [new Date().toISOString().split('T')[0]]
     })
   }

  ngOnInit() {
  }
  FilterDeposits(searchForm){
   this.saveFile(searchForm)
  }
  saveFile(searchForm){
    this.userservice.changeValueLoading(1);
    let obj= {
      fromDate : searchForm.value.fromDate,
      toDate : searchForm.value.toDate
    }
    this.currencyservice.adminBalanceReport(obj)
    .subscribe(response => {
      this.userservice.changeValueLoading(0);
        let sheetData = [];
        let opts = [];
        for (let data in response.data) {
            response.data[data].map((val)=>{
              val.Created_AT = this.parseDate(val.Created_AT);
              return val
            })
            if(response.data[data].length!==0){
                opts.push({
                  sheetid:data,
                  header:true
              });
              sheetData.push(response.data[data])
            }
        } ;
         let fileName = `Balance-Report ${this.parseDate(new Date())}.xlsx`
        var res = alasql(`SELECT INTO XLSX('${fileName}',?) FROM ?`,
                         [opts,sheetData]);
    },
    (error)=>{
      this.userservice.changeValueLoading(0);
    }
    )
      }

      parseDate(date){
        let newDAte = new Date(date);
        let parsedDate = newDAte.toLocaleDateString("default", {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        });
        let time = newDAte.toLocaleTimeString("default", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit"
        });
        date = parsedDate+ " " +time;
        return date
      }

  // download(objdata,type){
  //   var csvData = this.ConvertToCSV(objdata,type);
  //   var a = document.createElement("a");
  //   a.setAttribute('style', 'display:none;');
  //   document.body.appendChild(a);
  //   if(type=="xlsx"){
  //     var blob = new Blob([(csvData)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     var url= window.URL.createObjectURL(blob);
  //     a.href = url;
  //     a.download = 'Currency-summary.xlsx';
  //   }else{
  //     var blob = new Blob([csvData], { type: 'text/csv' });
  //     var url= window.URL.createObjectURL(blob);
  //     a.href = url;
  //     a.download = 'Currency-summary.csv';
  //   }
  //   a.click();
    
  // }

  // ConvertToCSV(objArray,type) {
  //   if(type=="xlsx"){
  //     var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
  //   }else{
  //     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  //   }
  //   var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
  //   var str = '';
  //   var row = "";
    
  //   for (var index in objArray[0]) {
  //       row += index + ',';
  //   }
  //   row = row.slice(0, -1);
  //   str += row + '\r\n';
  //   for (var i = 0; i < array.length; i++) {
  //       var line = '';
  //       for (var index in array[i]) {
  //           if (line != '') line += ','
    
  //           line += array[i][index];
  //       }
  //       str += line + '\r\n';
  //   }
  //   return str;
  //   }


}

