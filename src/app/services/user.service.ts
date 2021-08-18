import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

declare var require: any;

@Injectable()
export class UserService {
  public NotificationCount = new BehaviorSubject(false);

  getNotificationStatus(val) {
    this.NotificationCount.next(val);
  }

  headers: Headers;
  options: RequestOptions;
  constructor(private router: Router, private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('tokenAdmin') });
    this.options = new RequestOptions({ headers: this.headers });
  }

  isLoggedIn() {
    let loginStatus = this.currentUser;
    if (loginStatus) {
      return true;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('tokenAdmin');
    // localStorage.removeItem('remember'); 
    this.router.navigate(['/authentication/login']);
  }

  get currentUser() {
    let token = localStorage.getItem('tokenAdmin');
    if (!token) return null;
    return new JwtHelperService().decodeToken(token);
  }

  submitLogin(postData) {
    return this.http.post(environment.APIURL + '/user/login', postData);
  }

  requestEncryption(data) {
    let CryptoJS = require('crypto-js');
    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '2ed5ebe2294ecd0e0f08eab7690d2a6aa98');

    return ciphertext.toString();
    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), '2ed5ebe2294ecd0e0f08eab7690d2a6aa98');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(plaintext);
    // debugger
  }

  fetCountryCodes() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/fetchcountrycodes', this.options);
  }

  getNotifications() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/notification/list', this.options);
  }


  getUserBankList(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/all/users/bank/list',data, this.options);
  }

  getUserSpecificBankList(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/user_bank/list',data, this.options);
  }

  

  updateemailOrphone(data){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/update/user/details',data, this.options);
    
  }

  approveDissapproveUserAllBankList(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/approve_disapprove/user/all/bank',data, this.options);
  }

  deleteUserAllBank(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/delete/user/all/bank',data, this.options);
  }
  deleteuserBank(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/delete/user/bank',data, this.options);
  }

  updateUserBankList(id,data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + `/admin/update/user/bank/${id}`,data, this.options);
  }

  approveDissapproveUserBankList(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/approve_disapprove/user/bank',data, this.options);
  }
  
  


  getUserList(count, searchval) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/kycuserlisting/' + count + '?search=' + searchval, this.options);
  }

  notificationSeen(id) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.put(environment.APIURL + `/notification/getNotification/${id}`, {}, this.options);
  }

  getBUySellOrder(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.BUYSELLURL + '/buysell/admin/getbuysellOrders', data, this.options);
  }

  getBUySellOrderdownload(data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.BUYSELLURL + '/buysell/admin/getbuysellOrders/download', data, this.options);
  }
  

  getUserKyc(userid) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/getkycdetidaccording/' + userid, this.options);
  }

  getUserListApproved(count, search) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/kycapproveduserlisting/' + count + '?search=' + search, this.options);
  }

  getWithdrawList(count, searchval) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/admin/withdrawlisting/' + count, this.options);
  }


  getWithdrawListDownload(searchval) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/withdrawlisting/download',searchval, this.options);
  }

  getSearchedWithdrawList(count, data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/searchwithdrawlisting/' + count, data, this.options);
  }

  getSearchedFiatWithdrawList(count, data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/withdrawlistingfiat/' + count, data, this.options);
  }



  getFiatWithdrawList(count, data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/withdrawlistingfiat/' + count,data, this.options);
  }



  getFiatWithdrawListDownload( data) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/withdrawfiat/download' ,data, this.options);
  }

  getBankDetail(acc_id, member_id, bank_id) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(
      environment.APIURL + '/user/getbankadmin',
      { member_id: member_id, account_number: acc_id, id: bank_id },
      this.options
    );
  }

  getDeposits(count, searchval) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/bankDepositsHistory/' + count, searchval, this.options);
  }

  getDepositsDownload(searchval) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/bankDeposits/download' , searchval, this.options);
  }

  changeBankDepositStatus(status, wid, reason) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(
      environment.APIURL + '/admin/updateBankTransactionStatus/',
      { id: wid, status: status, reason: reason },
      this.options
    );
  }

  getTokenListDates(count) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/admin/investers/date_list?limit=10&page=' + count + ' ', this.options);
  }

  getIncestorListDates(count, date) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/admin/investers/list/?date=' + date + '&limit=10&page=' + count + ' ', this.options);
  }

  addTokensToAcount(formsdata) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/investers/send_token', formsdata, this.options);
  }

  fireBaseNotificatons(formsdata) {
    let data = JSON.stringify(formsdata);
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append(
      'Authorization',
      'key=AAAALO3AWPY:APA91bF30ELzvdW4lBKygEZQ9cbf5FApbuVXuY5lde4Ji1cXf9ALxB6jF7z4wB36Ia8mjmf0xgA7teLSe4bI-wXU7TlIPP1uoJ3iKr4vJYg2e_WFb-aHLaKQdEBUAac3trWMW97GsG5d'
    );
    this.options = new RequestOptions({ headers: header });
    return this.http.post('https://fcm.googleapis.com/fcm/send', data, this.options);
  }

  changeKycStatus(status, userid, reason) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    if (status == 1) return this.http.post(environment.APIURL + '/user/kycactivate/' + userid, { reason: reason }, this.options);
    else return this.http.post(environment.APIURL + '/user/kycDeactivate/' + userid, { reason: reason }, this.options);
  }

  getUserDetail(userid) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/Apiname/' + userid, this.options);
  }

  changeWithdrawStatus(status, wid, reason) {
    let header = new Headers();
    // header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    if (status == 1) return this.http.post(environment.APIURL + '/admin/approve_withdraw/' + wid, {}, this.options);
    else return this.http.post(environment.APIURL + '/admin/cancelwithdraw/' + wid, { reason: reason }, this.options);
  }

  disapproveFiatWithdrawReq(wid, reason) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/fiat_disapprove', { withdraw_id: wid, reason: reason }, this.options);
  }

  approveFiatWithdrawReq(fdata) {
    // const filedata = new FormData();
    // filedata.append('receiptpicture', fdata.receiptpicture, fdata.receiptpicture.name);
    // filedata.append('tid', fdata.tid);
    // filedata.append('withdraw_id', fdata.withdraw_id);

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/fiat_approve', fdata, this.options);
    // fiat_approve
  }

  private valid = new BehaviorSubject<boolean>(true);
  cast1 = this.valid.asObservable();
  changeValueCheckPass(changevalue) {
    this.valid.next(changevalue);
  }

  verifyGToken(token) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/user/google2falogin', { token: token }, this.options);
  }

  verifySigninToken(token) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokentempAdmin'));
    return this.http.post(environment.APIURL + '/user/google2falogin', { token: token }, { headers: header });
  }

  getuserAllstatusByToken(token) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', token);
    return this.http.post(environment.APIURL + '/user/userservices', {}, { headers: header });
  }

  getTradersList(tradeSearchModel): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/traders/';
    return this.http
      .post(url, tradeSearchModel, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTraderDetail(member_id): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/traderDetail', { member_id: member_id }, this.options);
  }

  getKycDetails(member_id) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/getuserkycdetails', { member_id: member_id }, this.options);
  }

  lockTrader(member_id): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/lockUser';
    return this.http
      .post(url, { member_id }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendAuthKey(member_id): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/sendAuthKey';
    return this.http
      .post(url, { member_id }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateKycUser(editUser): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/kycUpdate';
    return this.http
      .post(url, editUser, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateKyc(postdata, document, selfie,frontPhone) {
    let header = new Headers();
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    const fd = new FormData();

    if (frontPhone) {
      fd.append('front_photo', frontPhone, frontPhone.name);
    }
    if (selfie) {
      fd.append('back_photo', selfie, selfie.name);
    }

    if (document) {
      fd.append('p_res_photo', document, document.name);
    }
    fd.append('member_id', postdata.member_id);
    fd.append('first_name', postdata.firstName);
    fd.append('email', postdata.email);

    fd.append('middle_name', postdata.middleName);
    fd.append('last_name', postdata.lastName);
    fd.append('gender', postdata.gender);
    fd.append('dob', postdata.dob);
    fd.append('phone_code', postdata.phone_code);
    fd.append('phone', postdata.phone);
    fd.append('address', postdata.address);
    fd.append('city', postdata.city);
    fd.append('country', postdata.country);
    fd.append('zipcode', postdata.zipcode);
    fd.append('doc_type', postdata.doc_type);
    fd.append('doc_number', postdata.doc_number);
    fd.append('p_res_type', postdata.p_res_type);
    fd.append('father_husband_name', postdata.father_husband_name);
    fd.append('relation', postdata.relation);
    fd.append('doc_exp_date', postdata.doc_exp_date);

    return this.http.post(environment.APIURL + '/admin/updateKycDetails', fd, { headers: header });
  }

  deleteKycUser(memberId, reason): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http
      .post(environment.APIURL + '/admin/kycDelete', { memberId: memberId, reason: reason }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllCounters(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/allCounters';
    return this.http
      .post(url, {}, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllCentralBalance(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/admincentralbalance';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // getTradeVolumeComparison(): Observable<any> {
  //   let header = new Headers();
  //   header.append('Content-Type', 'application/json');
  //   header.append('Authorization',localStorage.getItem('tokenAdmin') );
  //   this.options = new RequestOptions({ headers: header });
  //   let url = environment.APIURL+'/admin/tradeAndVolumeComparison';
  //   return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
  // }

  getNewAndActiveUsers(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/newAndActiveUsers';
    return this.http
      .post(url, {}, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // getTradeComparison(): Observable<any> {
  //   let header = new Headers();
  //   header.append('Content-Type', 'application/json');
  //   header.append('Authorization',localStorage.getItem('tokenAdmin') );
  //   this.options = new RequestOptions({ headers: header });
  //   let url = environment.APIURL+'/admin/tradesByMonth';
  //   return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
  // }

  // getWithdrawComparison(): Observable<any> {
  //   let header = new Headers();
  //   header.append('Content-Type', 'application/json');
  //   header.append('Authorization',localStorage.getItem('tokenAdmin') );
  //   this.options = new RequestOptions({ headers: header });
  //   let url = environment.APIURL+'/admin/tradesByMonth';
  //   return this.http.post(url,{}, this.options).map(this.extractData).catch(this.handleError);
  // }

  changePassword(postData) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.post(environment.APIURL + '/admin/changePassword', postData, this.options);
  }

  getuserProfile() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/getuserprofile', this.options);
  }

  uploadProfile(selectedFile) {
    let header = new Headers();
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    const fd = new FormData();
    fd.append('user_profile_img', selectedFile, selectedFile.name);
    return this.http.post(environment.APIURL + '/user/uploadprofileimage', fd, { headers: header });
  }

  getuserKyc() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    return this.http.get(environment.APIURL + '/user/getuserkycdetails', this.options);
  }

  private url = new BehaviorSubject<string>('./assets/images/default-profile-pic.png');
  casturl = this.url.asObservable();

  changeValueURL(changevalue) {
    this.url.next(changevalue);
  }

  public loading = new BehaviorSubject<number>(0);
  cast4 = this.loading.asObservable();

  changeValueLoading(changevalue) {
    this.loading.next(changevalue);
  }

  getPairs(pno) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/admin/pairs/';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePairs(editUser, ex_id) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/admin/update-pairs/' + ex_id;
    return this.http
      .put(url, editUser, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPairDetail(ex_id): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.BUYSELLURL + '/buysell/admin/getpairs/' + ex_id;
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  lockSubAdmin(member_id, status): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/changeSubAdminStatus';
    return this.http
      .post(url, { member_id: member_id, status: status }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBankList(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/getadminbankdetails';
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  setDefaultBank(bank_id, type) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    this.options = new RequestOptions({ headers: header });
    let url = environment.APIURL + '/admin/setdefaultbank';
    return this.http
      .post(url, { bank_id: bank_id, type: type }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteRecordById(bank_id, type) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', localStorage.getItem('tokenAdmin'));
    return this.http.post(environment.APIURL + '/admin/changeadminbankstatus/' + bank_id, { status: 0, type: type }, { headers: header });
  }

  getIpAddress() {
    let header = new Headers();
    return this.http.get('https://jsonip.com', { headers: header });
  }

  unlockPassword(member_id) {
    {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', localStorage.getItem('tokenAdmin'));
      return this.http.post(environment.APIURL + '/admin/unlocksuspendeduser', member_id, { headers: header });
    }
  }

  // verifyJWTtoken() {
  //   let header = new Headers({
  //     Authorization: localStorage.getItem('tokenAdmin')
  //   });
  //   header.append('Content-Type', 'application/json');
  //   return this.http.post(
  //     environment.APIURL + '/user/matchcurrenttoken',
  //     { token: localStorage.getItem('tokenAdmin') },
  //     { headers: header }
  //   );
  // }
}
