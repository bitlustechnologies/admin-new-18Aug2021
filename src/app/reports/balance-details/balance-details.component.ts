import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.css']
})
export class BalanceDetailsComponent implements OnInit {

 balanceDetail:any;

constructor(private reportService : ReportService,private userservice :UserService) { }

ngOnInit() {
  this.balanceDetails()
  }
  
balanceDetails(){
  this.userservice.changeValueLoading(1);
  this.reportService.balanceDetails().subscribe((response:any)=>{
    if(response){
      this.balanceDetail=[];
      if(response.json().data.length){
        for (let index = 0; index < 8; index++) {
          if(response.json().data[index]){
            this.balanceDetail.push(response.json().data[index]);
          };
        };
      }
      // this.balanceDetail=response.json().data
      this.userservice.changeValueLoading(0);
    }else{
      this.userservice.changeValueLoading(0);
    }
  },(error)=>{
    this.userservice.changeValueLoading(0);
  })
}
reloadPage(){
  window.location.reload()
}

}
