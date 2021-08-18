import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { environment } from '../../../environments/environment.prod';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginf:NgForm
  msgs: Message[] = [];
  loginstatus: any;
  captchakey: any;
  captchaResponse: any;
  superAdmin: any;
  ip: any = '';
  rememberEmail:any=''
rememberPassword:any=''
rememberMeee:boolean = false


  constructor(
    private toastr: ToastrService,
    private messageservice: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private titleService: Title
  ) {
    router.events.subscribe(event => {
      //fires on every URL change
      titleService.setTitle('Bitlus-Admin');
    });
  }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.captchakey = environment.CAPTCHAKEY;

    this.loadFormScript();
    if(localStorage.getItem('remember')){
   
    let remember = JSON.parse(localStorage.getItem('remember'))
    this.rememberPassword = atob(remember.auth).toString()
    this.rememberEmail = atob(remember.usern).toString()
    this.rememberMeee= true
    }

    localStorage.removeItem('tokentempAdmin');
    if (this.userservice.currentUser != null) {
      this.router.navigate(['/admin-dashboard-section/admin-dashboard']);
    }

    // console.log(this.userservice.isLoggedIn())
  }

  public loadFormScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.google.com/recaptcha/api.js';
      scriptElement.onload = resolve;

      document.body.appendChild(scriptElement);
    }).then(() => {});
  }

  

  resetGoogleCaptcha() {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = './assets/js/reset.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  login(f) {
    this.userservice.changeValueLoading(1);

    this.captchaResponse = $('.g-recaptcha-response').val();
    // console.log(this.captchaResponse)

    if (this.captchaResponse == undefined || this.captchaResponse == '') {
      this.userservice.changeValueLoading(0);
      this.messageservice.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Captcha field is required.'
      });
      return false;
    }
    this.userservice.getIpAddress().subscribe(
      ipresponse => {
        this.ip = ipresponse.json().ip;
        let postData = {
          email: f.value.email,
          password: f.value.password,
          device_token: 1,
          device_type: 3,
          'g-recaptcha-response': this.captchaResponse,
          address: this.ip
        };
        this.userservice.submitLogin(postData).subscribe(
          response => {
            this.userservice.changeValueLoading(0);
            let result = response.json();
            if (result && result.token) {
              if (result.data.user_role == 1) {
                this.toastr.error('Please login with only admin credential', 'Failure!');
                this.resetGoogleCaptcha();
                return true;
              }
              this.userservice.getuserAllstatusByToken(result.token).subscribe(response => {
                let googleEnable = response.json().google2fa_active;
                if (googleEnable == 1) {
                  localStorage.setItem('tokentempAdmin', result.token);
                  this.toastr.success('Google authentication required', 'Google Authentication');
                  setTimeout((router: Router) => {
                    if (f.value.rememberMe == true) {
                      let remember = {
                        auth: btoa(f.value.password),
                        usern: btoa(f.value.email)
                      };
                      localStorage.setItem('remember', JSON.stringify(remember));
                    }else if (f.value.rememberMe ==''){
                      localStorage.removeItem('remember')
                    }
                    localStorage.setItem('adminPass', postData.password);
                    this.router.navigate(['/authentication/google']);
                    return true;
                  }, 3000);
                } else {
                  localStorage.setItem('tokenAdmin', result.token);
                  this.toastr.success('Now redirecting to dashboard....', 'Login Success!');
                  setTimeout((router: Router) => {
                    if (f.value.rememberMe == true) {
                      let remember = {
                        auth: btoa(f.value.password),
                        usern: btoa(f.value.email)
                      };
                      localStorage.setItem('remember', JSON.stringify(remember));
                    }else if (f.value.rememberMe ==''){
                      localStorage.removeItem('remember')
                    }

                    localStorage.setItem('adminPass', postData.password);
                    this.router.navigate(['/admin-dashboard-section/admin-dashboard']);

                    return true;
                  }, 3000);
                }
              });
            } else {
              this.resetGoogleCaptcha();
              if (result.message) {
                this.toastr.error(result.message, 'Login Failed');
              } else {
                this.toastr.error('Authentication Failure', 'Login Failed');
              }
            }
          },
          err => {
            this.userservice.changeValueLoading(0);
            this.resetGoogleCaptcha();
            this.toastr.error(err.json().message, 'Login Failed');
          }
        );
      },
      error => {
        this.userservice.changeValueLoading(false);
        this.toastr.error('Something went wrong, please try again.');
      }
    );
  }
}
