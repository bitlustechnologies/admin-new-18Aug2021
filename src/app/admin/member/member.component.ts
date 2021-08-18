import { ErrorhandlingService } from './../../services/errorhandling.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from './../../apps/email/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { subDays } from 'date-fns';
import { DatatableComponent } from './../../table/data-table/data-table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  userlists:any
  total:any
  page:any=1
  empty:boolean=false
  searchVal:string='';
  totalRecords:any;

  constructor(private userservice: UserService,
    private messageservice: MessageService,
    private toastr: ToastrService,
    private errorhandling:ErrorhandlingService
  ) {

  }


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
       this.userservice.getUserList(limit,this.searchVal)
        .subscribe(response => {
           if(response.json().data.length == 0)
           this.empty = true
           else
           this.empty = false 
           this. userlists = response.json().data
           this. userlists = response.json().data.filter(x=>x.user_role === 1)
           this.total = Math.ceil(response.json().total / 10)
          this.totalRecords = response.json().total;

        },(error)=>{
          // this.userservice.changeValueLoading(0);
          this.errorhandling.errorHandler(error)
        })

  }
   


}
