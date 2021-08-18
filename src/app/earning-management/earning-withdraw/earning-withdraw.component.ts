import { NgForm } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-earning-withdraw',
  templateUrl: './earning-withdraw.component.html',
  styleUrls: ['./earning-withdraw.component.css']
})
export class EarningWithdrawComponent implements OnInit {
  empty:boolean=false;
  withdrawList:any
  total:any
  pageNo:any=1
  totalRecords:any;
  newUser = { amountWithdraw:'',address: '', btccommission:''};
  constructor(private userservice: UserService,private toastr: ToastrService,) 
  {

  }

  ngOnInit() {
    // getWithdrawList(pageNo);
    this.withdrawList=data;
    this.totalRecords=data.length;
  }

  prev()
  {
     if(this.pageNo !=1)
     {
        // this.getWithdrawList(this.page -1);  
        this.pageNo = this.pageNo - 1 
     } 
  }

  next(){
    if(this.pageNo != this.total)
    {
      //  this.getWithdrawList(this.pageNo + 1);
       this.pageNo = this.pageNo + 1
    } 
  }

  changePage(page){
    this.pageNo = page
    // this.getWithdrawList(pageNo);
  }

  // getWithdrawList(pageNo)
  // {
  //      this.userservice.getWithdrawList(pageNo)
  //       .subscribe(response => {
  //          this.withdrawList=response.json().data;
  //          this.total = Math.ceil(response.json().total / 10)
  //          this.totalRecords = response.json().total;

  //       },(error)=>{

  //           console.log(error)
  //       })
  // }
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
  CreateUser(userForm: NgForm):void
  {
  }

  
}
