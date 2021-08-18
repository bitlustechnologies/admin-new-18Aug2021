import { CurrencyManagementModule } from './currency-management.module';

describe('CurrencyManagementModule', () => {
  let currencyManagementModule: CurrencyManagementModule;

  beforeEach(() => {
    currencyManagementModule = new CurrencyManagementModule();
  });

  it('should create an instance', () => {
    expect(currencyManagementModule).toBeTruthy();
  });
});
