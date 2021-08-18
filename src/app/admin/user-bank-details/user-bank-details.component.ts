import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-bank-details',
  templateUrl: './user-bank-details.component.html',
  styleUrls: ['./user-bank-details.component.css']
})
export class UserBankDetailsComponent implements OnInit {
  pageNo = 1
  totalRecords=0
  userBankLists:any =[]
  total:any
  constructor(
    private userService : UserService,
    private router :Router
  ) { }

  ngOnInit() {

let data ={
  "page": 1,
  "perPage": 10,
  "sortBy": "created_at"
}

    this.getBankdaetail(data)
  }

  getBankdaetail(data){
  this.userService.getUserBankList(data).subscribe((res:any)=>{
      this.userBankLists = res.json().data
      this.totalRecords = res.json().meta.total
      this.total=this.totalRecords/10;
    })
  }

  viewBank(e){
    this.router.navigate(['/admin/user-bank-view/',e,this.pageNo])
  }
  searchData(e){
    let data ={
      "page": 1,
      "perPage": 10,
      "sortBy": "created_at",
      search:e
    }
    this.getBankdaetail(data)
  }

  changePage(page){
    this.pageNo = page
    let data ={
      "page": this.pageNo,
      "perPage": 10,
      "sortBy": "created_at"
    }
    this.getBankdaetail(data)
  }
  prev()
  {
     if(this.pageNo !=0)
     {
       this.pageNo = this.pageNo;
       let data ={
        "page": this.pageNo,
        "perPage": 10,
        "sortBy": "created_at"
      }
      this.getBankdaetail(data)
     } 
  }

  next(){
    if(this.pageNo != this.total)
    {
       this.pageNo = this.pageNo + 1
       let data ={
        "page": this.pageNo,
        "perPage": 10,
        "sortBy": "created_at"
      }
      this.getBankdaetail(data)
    } 
  }

}
