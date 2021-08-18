import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newUser = { oldPassword: '',newPassword: '', confirmedPassword: ''};
  constructor(private userservice : UserService,
    private toastr: ToastrService,
    private errorhandling:ErrorhandlingService
    ) {}

  ngOnInit() {}

  ChangePassword(userForm: NgForm){
    if(userForm.value.newPassword != userForm.value.confirmedPassword)
      {
          this.toastr.error('Password and Confirm Password should be same', 'Error!');
          return false
      }
      let postData = 
      {
        "member_id": this.userservice.currentUser.data,
        "new_password":userForm.value.newPassword,
        "old_password": userForm.value.oldPassword,
        "confirm_password": userForm.value.confirmedPassword
      }
        
      this.userservice.changePassword(postData)
        .subscribe(response=>{
        this.toastr.success(response.json().message, 'Password Changed');
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
        this.toastr.error(error.json().message);
      })
    }
}