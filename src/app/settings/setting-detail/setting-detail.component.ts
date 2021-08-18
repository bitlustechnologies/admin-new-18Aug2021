import { SettingExponentPipe } from './../../pipes/setting-exponent.pipe';
import { filter } from 'rxjs/operators';
import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { BuysellService } from '../../services/buysell.service';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.component.html',
  styleUrls: ['./setting-detail.component.css']
})
export class SettingDetailComponent implements OnInit {
  objId:number;
  expFilterPipe: any;
  newUser = { currency_name: 0,markup_price:0, markdown_price:0, askPrice:0,bidPrice:0,actualSellPrice:0,actualBuyPrice:0};
  constructor( private router:ActivatedRoute,
    private buysellService:BuysellService,
    private route: Router,
    private errorhandling:ErrorhandlingService
    ) { 
   this.objId =  this.router.snapshot.params.id;
   
  }


  ngOnInit() {
    this.getPricedetails();
  }
 getPricedetails(){
  this.buysellService.getpriceList(this.objId).subscribe(res=>{
    this.newUser = res.json().data[0];

    this.expFilterPipe = new SettingExponentPipe();
    this.newUser.actualSellPrice = this.expFilterPipe.transform(this.newUser.actualSellPrice, 3);
    this.newUser.actualBuyPrice = this.expFilterPipe.transform(this.newUser.actualBuyPrice, 3);
    this.newUser.askPrice = this.expFilterPipe.transform(this.newUser.askPrice, 3);
    this.newUser.bidPrice = this.expFilterPipe.transform(this.newUser.bidPrice, 3);

  },(error)=>{
    // this.userservice.changeValueLoading(0);
    this.errorhandling.errorHandler(error)
  })
 }
  CreateUser(userForm: NgForm):void{


  }
  setmarkupRate(){
  let percentage =   (this.newUser.actualSellPrice * this.newUser.markup_price)/100;
 
  this.newUser.askPrice = this.newUser.actualSellPrice+percentage;

  }
  setmarkdownRate(){
    let percentage =   (this.newUser.actualBuyPrice * this.newUser.markdown_price)/100;
   
    this.newUser.bidPrice = this.newUser.actualBuyPrice-percentage;
  
    }
    updatePrice(){
      this.buysellService.updatePriceList(this.objId,this.newUser).subscribe(res=>{
        this.route.navigate(['/settings/setting-list']);
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      });
    }
}
