import { FundTransactionModule } from './fund-transaction.module';

describe('FundTransactionModule', () => {
  let fundTransactionModule: FundTransactionModule;

  beforeEach(() => {
    fundTransactionModule = new FundTransactionModule();
  });

  it('should create an instance', () => {
    expect(fundTransactionModule).toBeTruthy();
  });
});
