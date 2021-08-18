import { Injectable } from '@angular/core';
import { Http, Headers,Response , RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private router:Router,private http:Http) {}

  addBank(postData)
  {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization',localStorage.getItem('tokenAdmin') );
      return this.http.post(environment.APIURL+'/admin/addadminbank',postData,{headers:header});
  }

  getBankById(bank_id)
  {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('tokenAdmin') );
    return this.http.get(environment.APIURL+'/admin/getadminbankbyid/'+bank_id,{headers:header});
  }

  editBank(postData, bank_id)
  {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('tokenAdmin') );
    return this.http.post(environment.APIURL+'/admin/updateadminbank/'+bank_id, postData,{headers:header});
  }

  

}
