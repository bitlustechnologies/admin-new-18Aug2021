import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Message } from 'primeng/api';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html'
})
export class GoogleComponent implements OnInit {

  constructor(private router:Router,
    private userservice:UserService,
    private toastr: ToastrService

  ) { }

  msgs: Message[] = [];
  googleAuth:any;
  public loading = false;
  ngOnInit() {

    let temptoken1 = localStorage.getItem('tokentempAdmin')
    if(temptoken1 == null)
    {
        this.router.navigate(['/authentication/login']);
        return false;

    }


  }


  verify(f)
  {
    this.loading = true;
    // verify if this token is valid or not

     this.userservice.verifySigninToken(f.value.token)
    .subscribe(response => {
     
    
      if(response.json().status)
      {

        // now set tokentemp to token and redirect to settings
        
        let temptoken = localStorage.getItem('tokentempAdmin')
        localStorage.setItem('tokenAdmin',temptoken);
        localStorage.removeItem("tokentempAdmin");   

        // this.messageservice.add({severity:'success', summary:'Success', detail:response.json().message});
        this.toastr.success(response.json().message, 'Success!');

        setTimeout((router: Router) => {
          this.router.navigate(['/admin-dashboard-section/admin-dashboard']);
          return true;
        }, 3000);  



      }
      else
      {
        this.googleAuth = "";
        // this.messageservice.add({severity:'error', summary:'Error', detail:'An error has been occured'});
         this.toastr.error('An error has been occured', 'Failure!');

      }
      this.loading = false;


    },(error)=>{
      this.loading = false;
      this.googleAuth = "";
      // this.messageservice.add({severity:'error', summary:'Error', detail:'Invalid token! Please enter valid token.'});
      this.toastr.error('Invalid token! Please enter valid token.', 'Failure!');

    })


  }

}
