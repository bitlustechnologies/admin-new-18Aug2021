export class LiquidityModel {

    exchange:string;

    exchangeLabel:string;

    apiKey:string;

    secretKey:string;

    makeitDefault:boolean;

    btcAddress:string;

    ethAddress:string;

    liquidity_mode:string;

    liquidity_mode_type : string;
   
    liquidity_day_interval : number;

    orderHistory:{
        currencyPair:string;
        order_type: string;
        process_type:string;
        created_at:any;
        liquidity_vol:any;
        external_tx_id:any;
        order_status:string;
        exchange:string;
        
    }
    
}