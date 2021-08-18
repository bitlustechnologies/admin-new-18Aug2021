import { Injectable } from '@angular/core';
import { Http, Headers,Response , RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class OrderService {
    headers: Headers;
    options: RequestOptions;
    constructor(private router:Router,private http:Http)
    {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('tokenAdmin') });
        this.options = new RequestOptions({ headers: this.headers });
    }

    // getOrderList(orderSearchModel): Observable<any> {
    //     let header = new Headers();
    //     header.append('Content-Type', 'application/json');
    //     header.append('Authorization',localStorage.getItem('tokenAdmin') );
    //     this.options = new RequestOptions({ headers: header });
    //     let url = environment.APIURL+'/admin/orderList';
    //     return this.http.post(url,orderSearchModel, this.options).map(this.extractData).catch(this.handleError);
    // } 

    // getTradeSummaryList(): Observable<any> {
    //     let header = new Headers();
    //     header.append('Content-Type', 'application/json');
    //     header.append('Authorization',localStorage.getItem('tokenAdmin') );
    //     this.options = new RequestOptions({ headers: header });
    //     let url = environment.APIURL+'/admin/tradeSummary';
    //     this.options = new RequestOptions({ headers: this.headers});
    //     return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
    // } 
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}