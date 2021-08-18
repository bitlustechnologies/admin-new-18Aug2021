import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TradeSearchModel } from '../../shared/models/trade-search.model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.css']
})
export class PairsComponent implements OnInit {


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

  constructor(private userservice: UserService,private toastr: ToastrService,private modalService: NgbModal) 
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
   })

  }

  getTradersList(tradeSearchModel)
  {
       this.userservice.getPairs(this.pageNo)
        .subscribe(response => {
         
          if(response.status){

            let totalRecords = 5   // untill not implemented total recotds

                if(totalRecords > 0){
            
                  this.empty = false;
                  this.tradersLists=response.data;
                  this.totalRecords=totalRecords;
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

          // }   
        
       }
  }
    this.getTradersList(obj);
  }


resetFilter(form: NgForm){
  form.reset();
  this.getTradersList(this.tradeSearchModel);
}


}

