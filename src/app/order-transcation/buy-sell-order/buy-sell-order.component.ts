import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../apps/email/message';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-buy-sell-order',
  templateUrl: './buy-sell-order.component.html',
  styleUrls: ['./buy-sell-order.component.scss']
})
export class BuySellOrderComponent implements OnInit {
  type:string=''
  toDate:Date
  fromDate:Date
  userlists:any
  total:any
  page:any=1
  empty:boolean=false
  searchVal:string='';
  totalRecords:any;
  isSearched :boolean= false;
  searchObj :object;
  sendObj:object;
  currencyPairsList:any;
  defaultCurrency:any={};
  constructor(private userservice: UserService,
    private messageservice: MessageService,
    private toastr: ToastrService,
    private currencyservice: CurrencyService,
    private errorhandling:ErrorhandlingService
  ) {}

  msgs: Message[] = [];
  ngOnInit() {
    this.getDefaultCurrency();
    this.getUserList(this.page)
    this.getCurrencyPairsList();
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

  prev()
  {
    if(this.page !=1)
    {
      this.getUserList(this.page -1)  
      this.page = this.page - 1 
    } 
  }
  next(){
    if(this.page != this.total)
    {
      this.getUserList(this.page + 1) 
      this.page = this.page + 1
    } 
  }
  changePage(page){
    this.page = page
    this.getUserList(page)
  }
  goto(val)
  {
    var tag = val.target;
    var value = Math.floor(parseInt(tag.value));

    if(value >= 1 && value <= this.total)
    {
      this.getUserList(value)
      this.page = value
    }
  }
  searchData(text){
    this.page =1;
    this.searchVal = text;
    this.getUserList(this.page);
  }


  getUserList(limit)
  {
    if(this.isSearched == true){
      this.sendObj =  this.searchObj;
      this.searchObj['page'] = limit;
    }else{
      this.sendObj = {page:limit};
    }

    this.userservice.getBUySellOrder(this.sendObj)
      .subscribe(response => {
        if(response.json().data.length == 0)
          this.empty = true
        else
          this.empty = false 

        this. userlists = response.json().data
        //  this. userlists = response.json().data.filter(x=>x.user_role === 1)
        this.total = Math.ceil(response.json().total / 10)
        this.totalRecords = response.json().total;
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }
   
  FilterOrders(data:NgForm){
    console.log(data)
    this.page = 1;
    data.value.search =  true;
    data.value.page =    this.page;
    this.isSearched = true;
    this.searchObj = data.value;
    this.userservice.getBUySellOrder(data.value)
      .subscribe(response => {
        
        if(response.json().data.length == 0)
          this.empty = true
        else
          this.empty = false 
        
        this. userlists = response.json().data
        //  this. userlists = response.json().data.filter(x=>x.user_role === 1)
        this.total = Math.ceil(response.json().total / 10)
        this.totalRecords = response.json().total;
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

  showAll(e:NgForm){
    e.reset()
    // this.fromDate =new Date('dd/mm/yyyy')
    this.isSearched = false
    this.getUserList(this.page)
  }


  ExportCsv() { 
    this.userservice.getBUySellOrderdownload(this.searchObj)
      .subscribe((response:any) => {
          let data = response.json().data
          if(data.length > 0){
       
       let arr = data.map((val:any,i)=>{
         data[i]['Date'] = new Date(val.Date).toLocaleDateString()
         return val
            })
            this.download(arr, this.type);
          }
      })
  }

  download(objdata, type) {
    var csvData = this.ConvertToCSV(objdata, type);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    if (type == "xlsx") {
      var blob = new Blob([(csvData)], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Buy-Sell-Orders.xlsx';
    } else {
      var blob = new Blob([csvData], {
        type: 'text/csv'
      });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Buy-Sell-Orders.csv';
    }
    a.click();
  }

  ConvertToCSV(objArray, type) {
    if (type == "xlsx") {
      var array = typeof objArray != 'object' ? JSON.stringify(objArray) : objArray;
    } else {
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
