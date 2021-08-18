import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GoogleService } from '../../services/google/google.service';
@Component({
  selector: 'app-google-authentication-setting',
  templateUrl: './google-authentication-setting.component.html',
  styleUrls: ['./google-authentication-setting.component.css']
})
export class GoogleAuthenticationSettingComponent implements OnInit {
  newUser = { verifyToken: '',tokenText: 'FAUFI3RUKRJCG3RZLZYWY3RINBGHUZZGHRIDEXSTIRGFIRDFOVAQ', checkToken: false};
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


  EnableGoogleAuth(userForm: NgForm){

    this.disableBtn = true

    // console.log(userForm.value.tokenText)
    // verify if this token is valid or not

    this.googleservice.verifyToken(this.qrSecret,userForm.value.verifyToken)
    .subscribe(response => {


        if(response.json().status)
        {



          this.toastr.success(response.json().message, 'Verified');

          setTimeout((router: Router) => {
            this.router.navigate(['/admin-dashboard-section/admin-profile']);
            return true;
          }, 4000);    

        }
        else
        {

          setTimeout(() => {
            this.disableBtn = false
          }, 4000);
          this.toastr.error('An error has been occured', 'Error');

        }


        //  console.log(response)
    },(error)=>{
      setTimeout(() => {
        this.disableBtn = false
      }, 3000);
      this.toastr.error(error.json().message, 'Error');
      this.errorhandling.errorHandler(error)
    }
  )

    }
}
