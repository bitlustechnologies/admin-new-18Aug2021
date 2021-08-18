export class  TradeSearchModel
{
    limit:number=10;

    offset:number=1;

    fromDate?:Date;

    toDate?:Date;

    referredBy:string;

    email:string;

    country:string="";
}