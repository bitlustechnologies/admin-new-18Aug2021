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
export class FundService {
    headers: Headers;
    options: RequestOptions;
    constructor(private router:Router,private http:Http)
    {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('tokenAdmin') });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getDepositList(depositSearchModel): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/depositsWithdraws';
        return this.http.post(url,depositSearchModel, this.options).map(this.extractData).catch(this.handleError);
    } 

    getDepositListDownload(depositSearchModel): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/depositsWithdraws/download';
        return this.http.post(url,depositSearchModel, this.options).map(this.extractData).catch(this.handleError);
    } 

    getWithdrawList(withdrawSearchModel): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/depositsWithdraws';
        return this.http.post(url,withdrawSearchModel, this.options).map(this.extractData).catch(this.handleError);
    } 

    getWithdrawListDownload(withdrawSearchModel): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/depositsWithdraws/download';
        return this.http.post(url,withdrawSearchModel, this.options).map(this.extractData).catch(this.handleError);
    } 

    getCoinList(): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.BUYSELLURL+'/buysell/getcurrencylist/0';
        return this.http.get(url, this.options).map(this.extractData).catch(this.handleError);
    } 

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

    downloadDepositList(list){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.post(environment.APIURL+'/admin/bankDepositsHistoryDownload',{fromDate:(list.fromDate)? list.fromDate :'',toDate:(list.toDate)? list.toDate:''},{headers:header});
      }
}
