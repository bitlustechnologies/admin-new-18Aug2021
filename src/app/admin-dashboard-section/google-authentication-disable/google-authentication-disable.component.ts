import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleService } from '../../services/google/google.service';

@Component({
  selector: 'app-google-authentication-disable',
  templateUrl: './google-authentication-disable.component.html',
  styleUrls: ['./google-authentication-disable.component.css']
})
export class GoogleAuthenticationDisableComponent implements OnInit {

  constructor(  private toastr: ToastrService,
    private userservice : UserService,
    private googleservice:GoogleService,
    private router:Router,
    private errorhandling:ErrorhandlingService




    ) { }


  qrImage:any
  qrSecret:any
  google:any
  mykey:any
  disableBtn:boolean=false


  ngOnInit() {

    this.googleservice.getQrimage()
    .subscribe(response => {

      this.qrImage = response.json().qrImgUrl
      this.qrSecret = response.json().secret
      this.mykey = this.qrSecret 

      

        //  console.log(response)
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
      this.toastr.error('Cannot fetch details. Please try after some time', 'Error!');
    })


  }


  DisableGoogleAuth(userForm: NgForm){

    this.disableBtn = true

    // console.log(userForm.value.verifyToken)
    // verify if this token is valid or not

    // verify if this token is valid or not

    this.googleservice.disableGoogle(userForm.value.verifyToken)
    .subscribe(response => {
     
      if(response.json().status)
      {
        this.toastr.success(response.json().message, 'Verified');

    
        setTimeout((router: Router) => {
          this.router.navigate(['/admin-dashboard-section/admin-profile']);
          return true;
        }, 3000);    

      }
      else
      {
        setTimeout(() => {
          this.disableBtn = false
        }, 4000);
        this.toastr.error('An error has been occured', 'Error');

      }
    },(error)=>{
      setTimeout(() => {
        this.disableBtn = false
      }, 4000);
      this.toastr.error(error.json().message, 'Error');      
      this.errorhandling.errorHandler(error);
    })
  }
}

