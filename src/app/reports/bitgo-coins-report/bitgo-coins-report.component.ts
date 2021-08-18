import { Component, OnInit} from '@angular/core';
import { ReportService } from '../../services/report.service';
// declare var require: any;
// const data: any = require('./company.json');

@Component({
  selector: 'app-bitgo-coins-report',
  templateUrl: './bitgo-coins-report.component.html',
  styleUrls: ['./bitgo-coins-report.component.scss']
})
export class BitgoCoinsReportComponent implements OnInit {
  empty:boolean=false;
  bitgocoinList:any[]=[];
  type:string='';
  constructor(private reportservice: ReportService) { }

  ngOnInit() {
    this.getBitgoCoinList();
  }

  getBitgoCoinList(){
    
    this.reportservice.getBitgoCoinList()
        .subscribe(response => {

        if(response.data.length> 0){
          this.empty = false;
          this.bitgocoinList= response.data;
        }
        else
        {
          this.empty = true; 
          this.bitgocoinList = [];
        }
          
        },(error)=>{
        })
   
  }

  DownloadCSV(){
    
    this.reportservice.getBitgoCoinList()
    .subscribe(response => {
     
      if(response.status){
  
            if(response.data.length> 0){
               this.download(response.data,this.type);
            }
    }
      
    },(error)=>{
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
      a.download = 'Bitgo-coins.xlsx';
    }else{
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Bitgo-coins.csv';
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
