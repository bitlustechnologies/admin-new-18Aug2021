import { Component, OnInit} from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ToastrService } from 'ngx-toastr';
// import { CoinProfileSearchModel } from '../../shared/models/coin-profile-search.model';

// declare var require: any;
// const data: any = require('./company.json');

@Component({
  selector: 'app-coin-profile',
  templateUrl: './coin-profile.component.html',
  styleUrls: ['./coin-profile.component.scss']
})
export class CoinProfileComponent implements OnInit {
  empty:boolean=false;
  coinProfileList:any
  // total:any
  // pageNo:any=1
  // totalRecords:any;
  type:any='';
  // coinProfileSearchModel:CoinProfileSearchModel= new CoinProfileSearchModel;
  constructor(private reportservice: ReportService,private toastr: ToastrService,) 
  {}

  ngOnInit() {
    this.getCoinProfileList();
  }


  // prev()
  // {
  //    if(this.pageNo !=0)
  //    {
  //      this.pageNo = this.pageNo - 1;
  //      this.coinProfileSearchModel.offset=this.pageNo;
  //      this.getCoinProfileList(this.coinProfileSearchModel);
  //    } 
  // }

  // next(){
  //   if(this.pageNo != this.total)
  //   {
  //      this.pageNo = this.pageNo + 1
  //     this.coinProfileSearchModel.offset=this.pageNo;
      
  //      this.getCoinProfileList(this.coinProfileSearchModel);
  //   } 
  // }

  // changePage(page){
  //   this.pageNo = page
  //   this.coinProfileSearchModel.offset=this.pageNo;
  //   this.getCoinProfileList(this.coinProfileSearchModel);
  // }


  getCoinProfileList(){

    this.reportservice.getCoinProfileList()
        .subscribe(response => {

        if(response.data.length> 0){
          this.empty = false;
          this.coinProfileList= response.data;
          // this.totalRecords=response.totalRecords;
          // this.total=this.totalRecords/10;
        }
        else
        {
          this.empty = true; 
          // this.totalRecords =0;
          this.coinProfileList = [];
        }
          
        },(error)=>{
        })
   
  }


  // GetSearch(){
  //   this.pageNo = 0;
  //   this.coinProfileSearchModel.offset=this.pageNo;
  //   let obj= {};
  //   for (var key in this.coinProfileSearchModel) {
    
  //      if (this.coinProfileSearchModel.hasOwnProperty(key)) {

  //         if(this.coinProfileSearchModel[key]=='0')
  //            obj[key] = this.coinProfileSearchModel[key];  
         
  //         else if(this.coinProfileSearchModel[key]!='')
  //            obj[key] = this.coinProfileSearchModel[key];
        
  //      }
  // }
  //   this.getCoinProfileList(obj);
  // }


  DownloadCSV(){

    this.reportservice.getCoinProfileList()
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
      a.download = 'Coin-profile.xlsx';
    }else{
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Coin-profile.csv';
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
