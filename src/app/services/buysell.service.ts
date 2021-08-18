import { Injectable } from '@angular/core';
import { Http, Headers,Response , RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable()
export class BuysellService {
    headers: Headers;
    options: RequestOptions;
    constructor(private router:Router,private http:Http)
    {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('tokenAdmin') });
        this.options = new RequestOptions({ headers: this.headers });
    }
    
    getExchanges(id='')
    {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        if(id == '')
            return this.http.get(environment.BUYSELLURL+'/buysell/admin/getExchange',this.options);
        else
            return this.http.get(environment.BUYSELLURL+'/buysell/admin/getExchange/'+id,this.options);
    }
    
    updateExchange(obj,id){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.post(environment.BUYSELLURL+'/buysell/admin/updateExchange/'+id,obj,this.options);
    }
    
    updateOrderPlacement(obj){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.post(environment.BUYSELLURL+'/buysell/admin/updateOrderPlacementSetting',obj,this.options);
    }
    
    getorderPlacement(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.get(environment.BUYSELLURL+'/buysell/admin/getOrderplacementSetting',this.options);
    }
    
    getLiquidHistory(page,limit,pairId='',order_type='',search=false){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.post(environment.BUYSELLURL+'/buysell/admin/liquidityHistory',{
            offset:   page, limit : limit, pairId:pairId, order_type:order_type, search:search
        },this.options);
    }

    getbalanceReport(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.get(environment.APIURL+'/admin/adminOrderHistory',this.options);
    }
    
    getAllWithdrawHistory(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.get(environment.APIURL+'/wallet/all/withdraw_transactions',this.options);
    }
    
    getAllDepositHistory(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.get(environment.APIURL+'/wallet/all/deposit_transactions',this.options);
    }

    transferBalance(coin,data){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.post(environment.APIURL+'/wallet/'+coin+'/send/coldwallet',data,this.options);
    }
    
    getpriceList(id=0){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        if(id != 0 ){
            return this.http.get(environment.BUYSELLURL+'/buysell/admin/getCoinPrice/'+id,this.options);
        }else{
            return this.http.get(environment.BUYSELLURL+'/buysell/admin/getCoinPrice',this.options);
        }
    }
    
    updatePriceList(id,obj){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokenAdmin') );
        this.options = new RequestOptions({ headers: header });
        return this.http.put(environment.BUYSELLURL+'/buysell/admin/updateCoinPrice/'+id,obj,this.options);
    }
}