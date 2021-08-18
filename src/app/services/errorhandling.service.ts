import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlingService {

  constructor(private router:Router,private http:Http, private toastr: ToastrService) { }

  errorHandler(error){
    if(error.status == 401 && error.statusText == "Unauthorized"){
      this.toastr.error('Session expired, Please login again');
      localStorage.clear();
      this.router.navigate(['/authenticate/login']);
    }
    else if(error == "401 - Unauthorized")
    {
      this.toastr.error('Session expired, Please login again');
      localStorage.clear();
      this.router.navigate(['/authenticate/login']);
    }
  }
}
