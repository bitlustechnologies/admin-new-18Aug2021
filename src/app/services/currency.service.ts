import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class CurrencyService {
  headers: Headers;
  options: RequestOptions;
  constructor(private router: Router, private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('tokenAdmin') });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getCurrencyManageList(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/currency';
    return this.http
      .post(url, {}, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  adminDefaultCurrency(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/currencySymbol';
    // let url = environment.APIURL+'/admin/subuserdefcurrency';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAdminCurrency(currency_id, member_id): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/updateAdminCurrency';
    // let url = environment.APIURL+'/currency/updateuserdefcurreny';
    return this.http
      .post(url, { currency_id: currency_id, member_id: member_id }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCurrencyItem(currencyManageEditModel): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/editCurrencyInfo';
    return this.http
      .post(url, currencyManageEditModel, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCurrencyPairsList(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/currencyPairs';
    return this.http
      .post(url, {}, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBuySellPairsList(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/admin/getbuysellPair';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getFiatCurrencyApi(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/currency/currencylist';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllCurrencyApi(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/getcurrencylist';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCurrencyPairItem(obj): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/editCurrencyPairInfo';
    return this.http
      .post(url, obj, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateBuySellPairItem(obj): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/admin/buysellfee';
    return this.http
      .post(url, obj, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetails(pairid, type): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/admin/getbuysellfee';
    return this.http
      .post(url, { pair_id: pairid, type: type }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // getCurrencySummary(): Observable<any> {
  //     let header = new Headers();
  //     header.append('Content-Type', 'application/json');
  //     header.append('Authorization',localStorage.getItem('tokenAdmin') );
  //     this.options = new RequestOptions({ headers: header });
  //     let url = environment.APIURL+'/admin/currencySummary';
  //     return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
  // }

  getActiveCurrency(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/activecurrencylist';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCurrencyDetail(postdata, icon) {
    let header = new Headers();
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    const fd = new FormData();
    if (icon) {
      fd.append('icon', icon, icon.name);
    }

    fd.append('currency_id', postdata.currency_id);
    fd.append('currency_name', postdata.currencyName);
    fd.append('sign', postdata.currencySign);
    return this.http.post(environment.APIURL + '/admin/changecurrencyiconsign', fd, this.options);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  getCurrencySummary(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/currencySummary';
    return this.http
      .post(url, {}, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  adminBalanceReport(obj): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/downloadadminbalancereport';
    return this.http
      .post(url, obj, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
