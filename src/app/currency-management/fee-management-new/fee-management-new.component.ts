import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fee-management-new',
  templateUrl: './fee-management-new.component.html',
  styleUrls: ['./fee-management-new.component.css']
})
export class FeeManagementNewComponent implements OnInit {

  newUser = { currency: '',fee: ''};
  // constructor() { }

  ngOnInit() {

  }
  CreateUser(userForm: NgForm):void{
    
  }
}
