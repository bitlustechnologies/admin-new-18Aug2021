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

@Injectable()
export class SubAdminService {
    headers: Headers;
    options: RequestOptions;
    constructor(private router:Router,private http:Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('tokenAdmin') });
        this.options = new RequestOptions({ headers: this.headers });
    }

    // getUserList(param: any): Observable<any> {
    //     let header = new Headers();
    //     header.append('Content-Type', 'application/json');
    //     header.append('Authorization',localStorage.getItem('tokenAdmin') );
    //     this.options = new RequestOptions({ headers: header });
    //     let url = environment.APIURL+'/user/getuserlist/';
    //     let params: URLSearchParams = new URLSearchParams();
    //     for (var key in param) {
    //         if (param.hasOwnProperty(key)) {
    //             let val = param[key];
    //             params.set(key, val);
    //         }
    //     }
    //     this.options = new RequestOptions({ headers: this.headers, search: params });
    //     return this.http.get(url, this.options).map(this.extractData).catch(this.handleError);
    // }  
    
    getAllMenus()
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.get(environment.APIURL+'/admin/getSubAdminAccessType',{headers:header});
    }


    getUserList(page)
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.get(environment.APIURL+'/admin/allSubAdmins',{headers:header});
    }

    getsubAdminByMemberId(id)
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.get(environment.APIURL+'/admin/subAdmin/'+id,{headers:header});
    }

    addSubAdmin(postdata)
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.post(environment.APIURL+'/admin/addSubAdmin', postdata,{headers:header});
    }

    updateSubAdmin(postdata)
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.post(environment.APIURL+'/admin/editSubAdmin', postdata,{headers:header});
    }

    deleteMember(id)
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        return this.http.post(environment.APIURL+'/admin/deleteSubAdminUser', {'member_id':id},{headers:header});
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
}