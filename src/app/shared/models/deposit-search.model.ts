export class DepositSearchModel {
  limit: number = 10;

  offset: number = 1;

  coinId: string = 'all';

  userId: string;

  referredBy: string;

  email: string;

  status: string = 'all';

  fromDate?: Date;

  toDate?: Date;

  type: string = 'deposit';
}
