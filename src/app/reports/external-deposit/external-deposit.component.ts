import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReportService } from '../../services/report.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ExternalDeposit } from '../../shared/models/external-deposit';

@Component({
  selector: 'app-external-deposit',
  templateUrl: './external-deposit.component.html',
  styleUrls: ['./external-deposit.component.scss']
})
export class ExternalDepositComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild("t") tab :NgbTabset
  manualDeposit: any;
  allAdminCurrency : any=[];
  defaultCurrencies:any ;
  form:any;
  searchForm:any;
  index:number;
  pageNo:any=1
  totalRecords:any;
  modalRef: NgbModalRef;
  title:string = "Add New";
  submit:string = "Submit";
  total:any;
  allCurrency
  depositSearchModel:ExternalDeposit= new ExternalDeposit;

  constructor(private userservice : UserService,
    private reportService : ReportService,
    private toastrService :ToastrService,
    private fb : FormBuilder,
    private modalService: NgbModal
    ) {
      this.form = this.fb.group({
        'txidAddress':['',Validators.required],
        'amount': ['',Validators.required],
        'currency' : [''],
        'type' : ['']
      })
      this.searchForm = this.fb.group({
        currency_id: [''],
        type : [''],
        'fromDate' : [''],
        'toDate' : ['']
      })
   }

  ngOnInit() {
    this.manualDeposits(this.depositSearchModel);
    this.allAdminCurrencies();
    this.searchForm.patchValue({
      currency_id: 'All',
      type : 'All'
    })
    this.form.patchValue({
      currency:'A',
      type:'A'
    })


  }

  prev()
  {
     if(this.pageNo !=1)
     {
      this.pageNo = this.pageNo - 1;
      // this.pageNo = this.pageNo*10;
      this.depositSearchModel.offset=this.pageNo;
      this.depositSearchModel.offset=this.pageNo - 1;
      if(this.searchForm.value.currency_id != 'All' || this.searchForm.value.type != 'All'){
        this.depositSearchModel.currency_id= this.searchForm.value.currency_id;
      this.depositSearchModel.type = this.searchForm.value.type;
     }
      this.manualDeposits(this.depositSearchModel);
     } 
  }

  next(){
    if(this.pageNo != this.total)
    {
      this.pageNo= this.pageNo+1;
      // this.pageNo = this.pageNo*10;
      this.depositSearchModel.offset=this.pageNo;
      this.depositSearchModel.offset=this.pageNo - 1;
     if(this.searchForm.value.currency_id != 'All' || this.searchForm.value.type != 'All'){
        this.depositSearchModel.currency_id= this.searchForm.value.currency_id;
      this.depositSearchModel.type = this.searchForm.value.type;
     }
      this.manualDeposits(this.depositSearchModel);
    } 
  }

  changePage(page){
    this.pageNo=page
    this.depositSearchModel.offset=this.pageNo - 1;
    if(this.searchForm.value.currency_id != 'All' || this.searchForm.value.type != 'All'){
      this.depositSearchModel.currency_id= this.searchForm.value.currency_id;
    this.depositSearchModel.type = this.searchForm.value.type;
   }
    this.manualDeposits(this.depositSearchModel);
  }


  manualDeposits(depositSearchModel){
    this.userservice.changeValueLoading(1);

    this.reportService.manualDeposits(depositSearchModel).subscribe((response:any)=>{
      if(response){
        this.manualDeposit=response.result
        this.totalRecords = response.total
        if(response.total>0){
          this.total = response.total/10  
        }
        this.userservice.changeValueLoading(0);
      }else{
        this.userservice.changeValueLoading(0);
      }
    },(error) => {
      this.userservice.changeValueLoading(0);
    })
  }

  allAdminCurrencies(){
    this.userservice.changeValueLoading(1);
    this.reportService.allAdminCurrencies().subscribe((response:any)=>{
      if(response){
        this.allAdminCurrency=response.data;
        this.allCurrency = response.data
        this.userservice.changeValueLoading(0);
      }else{
        this.userservice.changeValueLoading(0);
      }
    })
  }

  getDetails(form){
    let obj = {
      txid_address:form.value.txidAddress,
      currency_id:form.value.currency,
      amount:form.value.amount,
      type:form.value.type
    }
  if(this.title !== "Add New"){
    // obj = {...obj,...{id :this.index}}
    obj['id'] = this.index
  }
  
    this.reportService.sendFormDetails(obj).subscribe((Response:any)=>{
            if(Response){
              this.toastrService.success(Response.message)
              this.tab.select("tab-selectbyid1");
              this.title = "Add New";
              this.form.reset()
              this.form.patchValue({
                currency:'A',
                type:'A'
              });
              this.manualDeposits(this.depositSearchModel);
            }else{
              this.toastrService.success("something went wrong")
            }
    })
  }
  delete(mId) {
    this.index = mId
    this.modalRef = this.modalService.open(this.content);
  }
  changeTab(e){
    if(this.tab.activeId==="tab-selectbyid1"){
      this.title = "Add New";
      this.submit = "Submit";
     
    }
 
  }

  editManualdeposit(list,index){
    this.index = list.id
    this.tab.select("tab-selectbyid2");
    this.title = "Edit Manual";
    this.submit = "Update"
     this.form.patchValue({
      'txidAddress' : list.txid_address,
      'amount'      : list.amount,
      'currency'    : list.currency_id,
      'type'        : list.type
     })
  }

  deleteDepositManual(){
    this.userservice.changeValueLoading(1);
    this.modalRef.close();
    let id ={
      id : this.index
    }
    this.reportService.DeleteDepositManual(id)
    .subscribe(response => {
      if(response.status){
        this.userservice.changeValueLoading(0);
        this.toastrService.success("Successfully Deleted");
        this.manualDeposits(this.depositSearchModel);
        // this.getUserList(this.page);
        // this.route.navigate(['/admin/approved_kyc']);
      }
      else{
        this.userservice.changeValueLoading(0);

      }
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.userservice.changeValueLoading(0);
      // this.errorhandling.errorHandler(error)
    });
      
  }
  FilterDeposits(searchForm){
    this.pageNo = 1;
    this.depositSearchModel.offset=this.pageNo -1;
    let obj= {};
    for (var key in this.depositSearchModel) {

       if (this.depositSearchModel.hasOwnProperty(key)) {

          if(this.depositSearchModel[key]=='0')
             obj[key] = this.depositSearchModel[key];  
         
          else if(this.depositSearchModel[key]!='')
             obj[key] = this.depositSearchModel[key]; 
       }
  }
  this.manualDeposits(obj);
  }
  selectType(e){
    if(e === 'CRYPTO'){
     this.allAdminCurrency = this.allCurrency.filter((x)=> {
      return  x.currency_symbol != "usd" && x.currency_symbol != "kes" && x.currency_symbol != "eur"
     })
    }else{
      this.allAdminCurrency = this.allCurrency.filter((x)=> {
        return  x.currency_symbol == "usd" || x.currency_symbol == "kes" || x.currency_symbol == "eur"
       })
    }
  }

}