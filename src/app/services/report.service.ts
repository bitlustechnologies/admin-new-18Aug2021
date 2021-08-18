import { Injectable } from '@angular/core';
import { Http, Headers,Response , RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportService {
    headers: Headers;
    options: RequestOptions;
    constructor(private http:Http)
    {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('tokenAdmin') });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getBitgoCoinList(): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/bitgoReports';
        return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
    } 

    getCoinBalanceList(): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/downloadbalanceReport';
        return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
    } 
    
    getCoinProfileList(): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/coinProfile';
        return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
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

    balanceDetails()  {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.get(environment.APIURL+'/admin/getadminallbalances',{headers:header});
      } 

      manualDeposits(depositSearchModel): Observable<any>  {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/getmanualdeposit';
        return this.http.post(url,depositSearchModel, this.options).map(this.extractData).catch(this.handleError);
      }

      allAdminCurrencies(): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/currency/alladmincurrency';
        return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
      }
      sendFormDetails(data): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/addeditmanual';
        return this.http.post(url,data, this.options).map(this.extractData).catch(this.handleError);
      }
      DeleteDepositManual(data): Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        let url = environment.APIURL+'/admin/deletemanual';
        return this.http.post(url,data, this.options).map(this.extractData).catch(this.handleError);
      }
}