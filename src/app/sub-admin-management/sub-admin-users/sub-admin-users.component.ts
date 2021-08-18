import { Component, OnInit ,ViewChild, TemplateRef} from '@angular/core';
import { SubAdminService } from '../../services/sub-admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { TradeSearchModel } from '../../shared/models/trade-search.model';
declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-sub-admin-users',
  templateUrl: './sub-admin-users.component.html',
  styleUrls: ['./sub-admin-users.component.css']
})
export class SubAdminUsersComponent implements OnInit {
  empty:boolean=false;
  userList:any
  total:any
  pageNo:any=1
  totalRecords:any;

  memberId:any;
  memberStatus:any;
  tradeSearchModel:TradeSearchModel= new TradeSearchModel;
  private modalRef: NgbModalRef;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private subadminService: SubAdminService,private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private userservice: UserService
  ) {}

  ngOnInit() {
    window.scrollTo(0,0);
    this.getUserList(this.pageNo);
    // this.userList=data;
    this.totalRecords=data.length;
  }

  prev()
  {
    if(this.pageNo !=1)
    {
      // this.getUserList(this.page -1);  
      this.pageNo = this.pageNo - 1 
    } 
  }

  next(){
    if(this.pageNo != this.total)
    {
      //  this.getUserList(this.pageNo + 1);
       this.pageNo = this.pageNo + 1
    } 
  }

  changePage(page){
    this.pageNo = page
    // this.getUserList(pageNo);
  }

  getUserList(pageNo)
  {
       this.subadminService.getUserList(pageNo)
        .subscribe(result => {


          if(result.json().data.length > 0)
          {
           this.empty = false
           this.userList=result.json().data;
           this.total = Math.ceil(result.json().total / 10)
           this.totalRecords = result.json().total;

          }
          else
          {
            this.empty = true
          }

        },(error)=>{
            this.empty = true
        })
  }

     
  
  DownloadCSV(){
  }

  open(mId,mStatus) {
 
    this.memberId=mId;
    this.memberStatus=mStatus;
    this.modalRef = this.modalService.open(this.content);
  }

  lockSubAdmin(){
    this.userservice.changeValueLoading(1);
    this.modalRef.close();
    let status;
    if( this.memberStatus==1)
      status = 0;
    if( this.memberStatus==0)
      status = 1
    this.userservice.lockSubAdmin(this.memberId, status)
      .subscribe(response => {
      
        if(response.status){
          this.userservice.changeValueLoading(0);
          this.pageNo = 1;
          this.getUserList(this.pageNo);
          this.tradeSearchModel.offset=this.pageNo;
          if( this.memberStatus==1)
          this.toastr.success("Successfully Locked");
          if( this.memberStatus==0)
          this.toastr.success("Successfully UnLocked");
        }
      },(error)=>{
          // this.userservice.changeValueLoading(0);
          this.userservice.changeValueLoading(0);
          // this.errorhandling.errorHandler(error)
        })
    }

  open2(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      // result => {
      //   this.closeResult = `Closed with: ${result}`;
      // },
      // reason => {
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // }
    );
  }

deleteMember(id){

 
  this.subadminService.deleteMember(id)
  .subscribe(response=>{
      this.toastr.success("Member deleted successfully", 'Deleted');


  
        this.modalRef.close()
   
      this.getUserList(this.pageNo)

  },(err)=>{
      
      this.toastr.error(err.json().message, 'Error');

  });

}

}
