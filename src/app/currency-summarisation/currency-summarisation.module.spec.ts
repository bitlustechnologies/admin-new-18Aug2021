import { CurrencySummarisationModule } from './currency-summarisation.module';

describe('CurrencySummarisationModule', () => {
  let currencySummarisationModule: CurrencySummarisationModule;

  beforeEach(() => {
    currencySummarisationModule = new CurrencySummarisationModule();
  });

  it('should create an instance', () => {
    expect(currencySummarisationModule).toBeTruthy();
  });
});
