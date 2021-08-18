import { ErrorhandlingService } from './../../services/errorhandling.service';
import { UserService } from './../../services/user.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastrService } from 'ngx-toastr';
import { Message } from './../../apps/email/message';
import { Component, OnInit ,ViewChild,TemplateRef} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {Router} from  '@angular/router';

@Component({
  selector: 'app-member-approved',
  templateUrl: './member-approved.component.html',
  styleUrls: ['./member-approved.component.css']
})
export class MemberApprovedComponent implements OnInit {
  memberId:any;
  userlists:any
  total:any
  page:any=1
  empty:boolean=false
  searchVal:string='';
  totalRecords:any;
  @ViewChild('content') content: TemplateRef<any>;
  modalRef: NgbModalRef;
  constructor(private userservice: UserService,
    private route:Router,
    private messageservice: MessageService,
    private toastr: ToastrService,private modalService: NgbModal,
    private errorhandling:ErrorhandlingService
  ) {}
  
  msgs: Message[] = [];
  ngOnInit() {
    this.getUserList(this.page)   
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
  changePage(page){
    this.page = page
    this.getUserList(page)
  }
  getUserList(limit)
  {
    this.userservice.getUserListApproved(limit,this.searchVal)
    .subscribe(response => {
      if(response.json().data.length == 0)
        this.empty = true
      else
        this.empty = false 
        this.userlists = response.json().data
        this.userlists = response.json().data.filter(x=>x.user_role === 1)
        this.total = Math.ceil(response.json().data[0].userCount / 10)
        this.totalRecords = response.json().total;
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      });
  }
   
  searchData(text){
    this.page =1;
    this.searchVal = text;
    this.getUserList(this.page);
  }

  open(mId) {
    this.memberId=mId;
    this.modalRef = this.modalService.open(this.content);
   // modalRef.componentInstance.name = 'World';
  }
//  saveData(){
//  console.log("save data");
//    this.modalRef.close();
//  }

  deleteKycUser(reason){
    this.userservice.changeValueLoading(1);
    if(!reason)
    {
      this.userservice.changeValueLoading(0);
      this.toastr.error('Please enter reason', 'Error');
      return false
    }

    this.modalRef.close();
    this.userservice.deleteKycUser(this.memberId, reason)
    .subscribe(response => {
      if(response.status){
        this.userservice.changeValueLoading(0);
        this.toastr.success("Successfully Deleted");
        this.getUserList(this.page);
        // this.route.navigate(['/admin/approved_kyc']);
      }
      else{

      }
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    });
      
  }
}