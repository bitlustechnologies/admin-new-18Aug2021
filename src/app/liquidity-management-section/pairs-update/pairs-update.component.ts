import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pairs-update',
  templateUrl: './pairs-update.component.html',
  styleUrls: ['./pairs-update.component.css']
})
export class PairsUpdateComponent implements OnInit {

  exc_id : any
  exchange_detail:any

  constructor(  private router: Router,   private toastr: ToastrService, private route:Router, private _route:ActivatedRoute, private userservice: UserService) { 
    this._route.params.subscribe( params =>
    {
      if (params["id"]) {
        this.exc_id=params["id"];
        this.getExchangeDetail(this.exc_id);
      }
     }
   );
  }

  ngOnInit() {
  }

  AddExchangeDetail(f)
  {
    this.userservice.updatePairs(f.value,this.exc_id)
    .subscribe(response=>{
        this.toastr.success("Pairs details updated successfully", 'Status Success');
        this.router.navigate(['/liquidity/pairs']);
    },(err)=>{
        this.toastr.error(err.json().message, 'Error');
    });
  }

  getExchangeDetail(exc_id)
  {
    this.userservice.getPairDetail(exc_id)
    .subscribe(response => {
      this.exchange_detail=response.data[0];
    },(error)=>{
    })
  }
}