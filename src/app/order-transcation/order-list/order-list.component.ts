// import { ErrorhandlingService } from './../../services/errorhandling.service';
// import { Component, OnInit ,ViewChild} from '@angular/core';
// import { OrderService } from '../../services/order.service';
// import { OrderSearchModel } from '../../shared/models/order-search.model';
// import { ToastrService } from 'ngx-toastr';
// import { NgForm } from '@angular/forms';

// declare var require: any;
// const data: any = require('./company.json');

// @Component({
//   selector: 'app-order-list',
//   templateUrl: './order-list.component.html',
//   styleUrls: ['./order-list.component.scss']
// })
// export class OrderListComponent implements OnInit {
//   empty:boolean=false;
//   ordersList:any[]=[]
//   total:any
//   pageNo:any=0
//   totalRecords:any;
//   type:string='';
//   orderSearchModel:OrderSearchModel= new OrderSearchModel;
//   constructor(private orderservice: OrderService,private toastr: ToastrService,private errorhandling:ErrorhandlingService) 
//   {

//   }

//   ngOnInit() {

//     this.getOrderList(this.orderSearchModel);
//   }

//   prev()
//   {
//      if(this.pageNo !=0)
//      {
//        this.pageNo = this.pageNo - 1;
//        this.orderSearchModel.offset=this.pageNo;
//        this.getOrderList(this.orderSearchModel);
//      } 
//   }

//   next(){
//     if(this.pageNo != this.total)
//     {
//        this.pageNo = this.pageNo + 1
//        this.orderSearchModel.offset=this.pageNo;
//        this.getOrderList(this.orderSearchModel);
//     } 
//   }

//   changePage(page){
//     this.pageNo = page
//     this.orderSearchModel.offset=this.pageNo;
//     this.getOrderList(this.orderSearchModel);
//   }

//   getOrderList(orderSearchModel)
//   { 
//        this.orderservice.getOrderList(orderSearchModel)
//         .subscribe(response => {
//           if(response.status){

//                 if(response.totalRecords> 0){
//                   this.empty = false;
//                   this.ordersList=response.data;
//                   this.totalRecords=response.totalRecords;
//                   this.total=this.totalRecords/10;
//                 }
//                 else
//                 {
//                   this.empty = true; 
//                   this.totalRecords =0;
//                   this.ordersList = [];
//                 }
//         }
          
//         },(error)=>{
//           // this.userservice.changeValueLoading(0);
//           this.errorhandling.errorHandler(error)
//         })
//   }

//   FilterOrders(searchForm:NgForm){
//     this.pageNo = 0;
//     this.orderSearchModel.offset=this.pageNo;
//     let obj= {};
//     for (var key in this.orderSearchModel) {

//        if (this.orderSearchModel.hasOwnProperty(key)) {

//           if(this.orderSearchModel[key]=='0')
//              obj[key] = this.orderSearchModel[key];  
         
//           else if(this.orderSearchModel[key]!='')
//              obj[key] = this.orderSearchModel[key]; 
//        }
//   }
//     this.getOrderList(obj);
//   }

//   DownloadCSV(){
//     this.orderSearchModel.limit=0;
//     this.orderservice.getOrderList(this.orderSearchModel)
//     .subscribe(response => {
     
//       if(response.status){
  
//             if(response.totalRecords> 0){
//                this.download(response.data,this.type);
//             }
//     }
      
//     },(error)=>{
//       // this.userservice.changeValueLoading(0);
//       this.errorhandling.errorHandler(error)
//     })
   
//   }
  
//   download(objdata,type){
//     var csvData = this.ConvertToCSV(objdata,type);
//     var a = document.createElement("a");
//     a.setAttribute('style', 'display:none;');
//     document.body.appendChild(a);
//     if(type=="xlsx"){
//       var blob = new Blob([(csvData)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       var url= window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'Order-list.xlsx';
//     }else{
//       var blob = new Blob([csvData], { type: 'text/csv' });
//       var url= window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'Order-list.csv';
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
