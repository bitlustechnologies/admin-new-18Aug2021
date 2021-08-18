export class OrderSearchModel {

    limit:number=10;

    offset:number=0;

    pairId:string='zar_btc';

    orderType:string='all';

    orderStatus:string='all';

    fromDate?:Date;

    toDate?:Date;

    email:string;
}