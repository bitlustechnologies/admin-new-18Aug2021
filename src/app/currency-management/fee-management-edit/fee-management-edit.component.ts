import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute} from  '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-fee-management-edit',
  templateUrl: './fee-management-edit.component.html',
  styleUrls: ['./fee-management-edit.component.css']
})
export class FeeManagementEditComponent implements OnInit {

  userid:any;
  editUser = { fee: '',currency: 1};
    constructor(private route:Router, private _route:ActivatedRoute, private userservice: UserService) { 
      this._route.params.subscribe( params =>
        {
         if (params["id"]) {
          
          this.userid=params["id"];
         }
       }
     );
    }
  
    ngOnInit() {
  this.editUser.fee='0.2%';
  this.editUser.currency=1;
     
    }
    UpdateUser(editForm: NgForm):void{
      this.route.navigate(['/currency-management/fee-management']);
     
      }

}
