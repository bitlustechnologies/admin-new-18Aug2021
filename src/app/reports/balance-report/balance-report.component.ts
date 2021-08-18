import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BuysellService } from '../../services/buysell.service';
import { isThursday } from 'date-fns';
import { ToastrService } from 'ngx-toastr';


declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-balance-report',
  templateUrl: './balance-report.component.html',
  styleUrls: ['./balance-report.component.css']
})
export class BalanceReportComponent implements OnInit {

  empty:boolean=false;
  bitgocoinList:any[]=[];
  type:string='';
  currencyType:string='';
  currencyWalletQrCode:string='';
  modalRef: NgbModalRef;
  moveDisable :boolean=true;
  exchangesList:any[]=[];
  hitBTCaddress:any
  selectedItem:any[];
  movedAmount:any;
  authToken:any;
  address:any;
  destination_tag:any;
  destinationRipple :boolean=false
  currencyName:any;
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('content1') content1: TemplateRef<any>;
  constructor(
    private reportservice: ReportService,
    private modalService: NgbModal,
    private buySellService: BuysellService,
    private toastr: ToastrService,
    private errorhandling:ErrorhandlingService
    ) { }
  hotWalletBalance:number=0;
  ngOnInit() {
    this.getCoinBalanceList();
    this.getExchangeList();
  }
  exchangeOption(e){
    if(e.target.value != 1){
      this.address = ''
    }else{
      this.address =this.hitBTCaddress
    }
  }
  open(item) {
    this.destinationRipple = false

    if(item.currency_name == 'Ripple'){
      this.destinationRipple = true
    }
    this.selectedItem = item;
     this.hotWalletBalance = item.hotwallet;
     this.currencyType=item.currency;
     this.address = item.address;
     this.hitBTCaddress = item.address;
     this.currencyName = item.currency_name
     this.modalRef = this.modalService.open(this.content);
   }
   ShowQRCode(item1){

    this.currencyWalletQrCode=item1.bal_address;
    this.currencyType=item1.currency_name;
    this.modalRef = this.modalService.open(this.content1);
   }
  getCoinBalanceList(){
    this.buySellService.getbalanceReport().subscribe(res=>{
      this.bitgocoinList = res.json().data;
    })
  }
  getExchangeList(){
    this.buySellService.getExchanges().subscribe(res=>{
      if( res.json().data.length > 0){
        console.log(res.json())
        this.exchangesList  = res.json().data.filter((val:any)=>val.name == "FTX");
        let other = {
          id:5,
          name:'Other'
        }
        this.exchangesList.push(other)  
      }
    });
  }
  moveWalletAmount(){

    if(this.selectedItem['currency_symbol'] == 'xrp')
    {
      if(this.selectedItem['destination_tag'] == null)
      {
        this.toastr.error("Either destination tag or xrp address is missing.", 'Error');
        return false;
      }
    }
     let obj={
       address: this.address,
       amount: this.movedAmount,
       authMethod:'google',
       token: this.authToken
     }
     if(this.selectedItem['currency_name'] == 'Ripple'){
       obj['destination_tag'] = this.destination_tag
     }
    this.buySellService.transferBalance(this.selectedItem['currency_symbol'],obj).subscribe(res=>{
      this.modalRef.close();
      this.toastr.success("Balance transferred successfully", 'Success');
    },(error)=>{
      this.toastr.error(error.json().message, 'Error');
    });
  }
  DownloadCSV(){
    this.reportservice.getCoinBalanceList()
    .subscribe(response => {
     
      if(response.status){
  
            if(response.data.length> 0){
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
      a.download = 'Balance-report.xlsx';
    }else{
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Balance-report.csv';
    }
    a.click();
    
  }
  validate(amt){
    this.hotWalletBalance = 100;
    
    if(amt.match('^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$')  == null){
      this.moveDisable = true;
      return false;
    }
    
    if(amt <= 0){
      this.moveDisable = true;
    }else if(amt > this.hotWalletBalance){
      this.moveDisable = true;
    }else{
      this.moveDisable = false;
    }
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


  copyToClipboard(e) {
    let result = this.copyTextToClipboard(e);
    if (result) {
      // this.commonService.toastr('Link Copied', 'success');
      this.toastr.success('Copied')
    }
  }

  copyTextToClipboard(text) {
    var txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      if (successful) {
        return true;
      }
    } catch (err) {
    } finally {
    document.body.removeChild(txtArea);
    }
    return false;
  }

}
