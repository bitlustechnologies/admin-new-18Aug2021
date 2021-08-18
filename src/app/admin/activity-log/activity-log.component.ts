import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {

  empty:boolean=false;
  activityLogList:any
  total:any
  pageNo:any=1
  totalRecords:any;
  constructor(private userservice: UserService,private toastr: ToastrService,) 
  {

  }

  ngOnInit() {
    // getActivityLogList(pageNo);
    this.activityLogList=data;
    this.totalRecords=data.length;
  }

  prev()
  {
     if(this.pageNo !=1)
     {
        // this.getActivityLogList(this.page -1);  
        this.pageNo = this.pageNo - 1 
     } 
  }

  next(){
    if(this.pageNo != this.total)
    {
      //  this.getActivityLogList(this.pageNo + 1);
       this.pageNo = this.pageNo + 1
    } 
  }

  changePage(page){
    this.pageNo = page
    // this.getActivityLogList(pageNo);
  }

  // getActivityLogList(pageNo)
  // {
  //      this.userservice.getActivityLogList(pageNo)
  //       .subscribe(response => {
  //          this.tradersLists=response.json().data;
  //          this.total = Math.ceil(response.json().total / 10)
  //          this.totalRecords = response.json().total;

  //       },(error)=>{

  //           console.log(error)
  //       })
  // }

}
