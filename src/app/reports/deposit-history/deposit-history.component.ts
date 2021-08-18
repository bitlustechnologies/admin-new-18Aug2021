import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { BuysellService } from '../../services/buysell.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.css']
})
export class DepositHistoryComponent implements OnInit {
  transaction:any[]=[];
  constructor(
    private buysellService: BuysellService,
    private errorhandling:ErrorhandlingService,
    private toastr: ToastrService,

  ) { 
    this.getDepositData();
  }

  ngOnInit() {


  }

  getDepositData(){
    this.buysellService.getAllDepositHistory().subscribe(res=>{
      console.log(this.transaction)
      this.transaction = res.json().transaction;
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }


  copyToClipboard(e) {
    let result = this.copyTextToClipboard(e);
    if (result) {
      // this.commonService.toastr('Link Copied', 'success');
      this.toastr.success('Copied')
    }
  }

  copyTextToClipboard(text) {
    var txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      if (successful) {
        return true;
      }
    } catch (err) {
    } finally {
    document.body.removeChild(txtArea);
    }
    return false;
  }

}
