import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-earnings-list',
  templateUrl: './earnings-list.component.html',
  styleUrls: ['./earnings-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EarningsListComponent implements OnInit {
  empty:boolean=false;
  earningList:any
  total:any
  pageNo:any=1
  totalRecords:any;
  constructor(private userservice: UserService,private toastr: ToastrService,) 
  {

  }

  ngOnInit() {
    // getEarningList(pageNo);
    this.earningList=data;
    this.totalRecords=data.length;
  }

  prev()
  {
     if(this.pageNo !=1)
     {
        // this.getEarningList(this.page -1);  
        this.pageNo = this.pageNo - 1 
     } 
  }

  next(){
    if(this.pageNo != this.total)
    {
      //  this.getEarningList(this.pageNo + 1);
       this.pageNo = this.pageNo + 1
    } 
  }

  changePage(page){
    this.pageNo = page
    // this.getEarningList(pageNo);
  }

  // getEarningList(pageNo)
  // {
  //      this.userservice.getEarningList(pageNo)
  //       .subscribe(response => {
  //          this.earningList=response.json().data;
  //          this.total = Math.ceil(response.json().total / 10)
  //          this.totalRecords = response.json().total;

  //       },(error)=>{

  //           console.log(error)
  //       })
  // }


}
