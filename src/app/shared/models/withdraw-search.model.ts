export class WithdrawSearchModel {

    limit:number=10;

    offset:number=1;

    coinId:string='all';

    userId:string;

    status:string='all';

    fromDate?:Date;

    toDate?:Date;

    type:string='withdraw';
}