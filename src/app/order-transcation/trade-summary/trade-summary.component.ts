// import { ErrorhandlingService } from './../../services/errorhandling.service';
// import { Component, OnInit ,ViewChild} from '@angular/core';
// import { OrderService } from '../../services/order.service';
// import { ToastrService } from 'ngx-toastr';
// import { NgForm } from '@angular/forms';

// declare var require: any;

// @Component({
//   selector: 'app-trade-summary',
//   templateUrl: './trade-summary.component.html',
//   styleUrls: ['./trade-summary.component.scss']
// })
// export class TradeSummaryComponent implements OnInit {

//   empty:boolean=false;
//   type:string='';
//   tradeSummaryList:any[]=[]
//   constructor(private orderservice: OrderService,private toastr: ToastrService,private errorhandling:ErrorhandlingService) 
//   {}

//   ngOnInit() {
//     // this.getTradeSummaryList();
//   }

//   // getTradeSummaryList()
//   // { 
//   //      this.orderservice.getTradeSummaryList()
//   //       .subscribe(response => {
//   //         if(response.status){

//   //               if(response.data.length> 0){
//   //                 this.empty = false;
//   //                 this.tradeSummaryList=response.data;
//   //               }
//   //               else
//   //               {
//   //                 this.empty = true; 
//   //               }
//   //       }
          
//   //       },(error)=>{
//   //         // this.userservice.changeValueLoading(0);
//   //         this.errorhandling.errorHandler(error)
//   //       })
//   // }

//   // DownloadCSV(){
  
//   //   this.orderservice.getTradeSummaryList()
//   //   .subscribe(response => {
     
//   //     if(response.status){
  
//   //           if(response.data.length> 0){
//   //              this.download(response.data,this.type);
//   //           }
//   //   }
      
//   //   },(error)=>{
//   //     // this.userservice.changeValueLoading(0);
//   //     this.errorhandling.errorHandler(error)
//   //   })
   
//   // }
  
//   download(objdata,type){
//     var csvData = this.ConvertToCSV(objdata,type);
//     var a = document.createElement("a");
//     a.setAttribute('style', 'display:none;');
//     document.body.appendChild(a);
//     if(type=="xlsx"){
//       var blob = new Blob([(csvData)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       var url= window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'Trade-summary.xlsx';
//     }else{
//       var blob = new Blob([csvData], { type: 'text/csv' });
//       var url= window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'Trade-summary.csv';
//     }
//     a.click();
    
//   }
  
//   ConvertToCSV(objArray,type) {
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


// }
