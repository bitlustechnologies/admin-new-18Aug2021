import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit ,ViewChild,TemplateRef} from '@angular/core';
import { UserService } from '../../services/user.service';
import { TradeSearchModel } from '../../shared/models/trade-search.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-traders-list',
  templateUrl: './traders-list.component.html',
  styleUrls: ['./traders-list.component.scss']
})
export class TradersListComponent implements OnInit {

  memberId:any;
  member_Id:any;
  memberStatus:any;
  empty:boolean=false;
  tradersLists:any[]=[];
  countryLists:any[]=[];
  total:any;
  pageNo:number=1;
  totalRecords:any;
  type:string='';
  modalRef: NgbModalRef;
  tradeSearchModel:TradeSearchModel= new TradeSearchModel;
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('content1') content1: TemplateRef<any>;

 
  constructor(private userservice: UserService,private errorhandling:ErrorhandlingService,
    private toastr: ToastrService,
    private modalService: NgbModal) 
  {}

  ngOnInit() {
    this.fetCountryCodes();
    this.getTradersList(this.tradeSearchModel);
  }

  prev()
  {
     if(this.pageNo !=0)
     {
       this.pageNo = this.pageNo;
       this.tradeSearchModel.offset=this.pageNo;
       this.getTradersList(this.tradeSearchModel);
     } 
  }

  next(){
    if(this.pageNo != this.total)
    {
       this.pageNo = this.pageNo + 1
       this.tradeSearchModel.offset=this.pageNo;
       this.getTradersList(this.tradeSearchModel);
    } 
  }

  changePage(page){
    this.pageNo = page
    this.tradeSearchModel.offset=this.pageNo;
    this.getTradersList(this.tradeSearchModel);
  }

  fetCountryCodes(){

    this.userservice.fetCountryCodes()
    .subscribe(response => {
     
      this.countryLists=response.json().data;
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })

  }

  getTradersList(tradeSearchModel)
  {
   
    this.userservice.getTradersList(tradeSearchModel)
      .subscribe(response => {
        if(response.status){
          if(response.totalRecords> 0){
            this.empty = false;
            this.tradersLists=response.data;
            this.totalRecords=response.totalRecords;
            this.total=this.totalRecords/10;
          }
          else
          {
            this.empty = true; 
            this.totalRecords =0;
            this.tradersLists = [];
          }
        }
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

FilterTraders(searchForm:NgForm){

    this.pageNo = 1;
    this.tradeSearchModel.offset=this.pageNo;
    let obj= {};

    for (var key in this.tradeSearchModel) {
    
       if (this.tradeSearchModel.hasOwnProperty(key)) {

          if(this.tradeSearchModel[key]=='0')
             obj[key] = this.tradeSearchModel[key];  
         
          else if(this.tradeSearchModel[key]!='')
             obj[key] = this.tradeSearchModel[key];

          // if(key==='fromDate')
          // {
          //   obj[key] = this.tradeSearchModel[key] +" 00:00:00";
          //   console.log(key);
          //   console.log( obj[key] );

          // }   
        
       }
  }
    this.getTradersList(obj);
  }

  resetFilter(form: NgForm){
    form.reset();
    this.getTradersList(this.tradeSearchModel);
  }


OpenAuthKeyModal(m_Id) {

  this.member_Id=m_Id;
  this.modalRef = this.modalService.open(this.content1);
}
 
sendAuthKey(){
  this.userservice.changeValueLoading(1);
  this.modalRef.close();
  this.userservice.sendAuthKey(this.member_Id)
      .subscribe(response => {
     
      if(response.status)
      {
        this.userservice.changeValueLoading(0);
        this.toastr.success("Key has been sent on user's email successfully.");
      }
      else
      {
        this.userservice.changeValueLoading(0);
        this.toastr.warning(response.message);
      }
  },(error)=>{
    // this.userservice.changeValueLoading(0);
    this.userservice.changeValueLoading(0);
    this.errorhandling.errorHandler(error)
  })
    
}

open(mId,mStatus) {
 
  this.memberId=mId;
  this.memberStatus=mStatus;
  this.modalRef = this.modalService.open(this.content);
}

lockTrader(){
  this.userservice.changeValueLoading(1);
  this.modalRef.close();
  this.userservice.lockTrader(this.memberId)
      .subscribe(response => {
    
        if(response.status){
          this.userservice.changeValueLoading(0);
          this.pageNo = 1;
          this.tradeSearchModel.offset=this.pageNo;
          this.getTradersList(this.tradeSearchModel);
          if( this.memberStatus==1)
          this.toastr.success("Successfully Locked");
          if( this.memberStatus==0)
          this.toastr.success("Successfully UnLocked");
        }
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

DownloadCSV(){

  this.tradeSearchModel.limit=0;
  this.userservice.getTradersList(this.tradeSearchModel)
  .subscribe(response => {
      if(response.status){
          if(response.totalRecords> 0){
            response.data.forEach(element => {
              if(element.first_name===null)
                {element.first_name='';}
            });

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
        a.download = 'Users-list.xlsx';
      }else{

        var blob = new Blob([csvData], { type: 'text/csv' });
        var url= window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'Users-list.csv';
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

unlockPassword(memberId){
  let data ={
    member_id:memberId
  }
  this.userservice.unlockPassword(data).subscribe((res:any)=>{
    if(res.status){
      this.toastr.success('User account has been unlocked from temporary suspension.');
      this.getTradersList(this.tradeSearchModel)
    }
  })
}

}
