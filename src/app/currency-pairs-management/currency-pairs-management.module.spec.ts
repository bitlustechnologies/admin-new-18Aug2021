import { CurrencyPairsManagementModule } from './currency-pairs-management.module';

describe('CurrencyPairsManagementModule', () => {
  let currencyPairsManagementModule: CurrencyPairsManagementModule;

  beforeEach(() => {
    currencyPairsManagementModule = new CurrencyPairsManagementModule();
  });

  it('should create an instance', () => {
    expect(currencyPairsManagementModule).toBeTruthy();
  });
});
