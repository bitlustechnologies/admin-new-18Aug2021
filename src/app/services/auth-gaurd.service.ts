import { UserService } from './user.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private userservice:UserService 
  ) { }

  canActivate(route,state:RouterStateSnapshot){
    
    if(this.userservice.isLoggedIn())
    {
      let token = localStorage.getItem('tokenAdmin');
      if(!token) {
        localStorage.clear();
        this.router.navigate(['/authenticate/login']);
        return false;
      }

      this.userservice.getuserAllstatusByToken(token)
      .subscribe(response => {
      },(error)=>{
        localStorage.clear();
        this.router.navigate(['/authenticate/login']);
        return false
     })
     return true;
    }
    
    this.router.navigate(['/authenticate/login'],{ queryParams:{
      returnUrl:state.url 
    } });
    localStorage.clear();
    return false;
  }
}