import { TradersManagementModule } from './traders-management.module';

describe('TradersManagementModule', () => {
  let tradersManagementModule: TradersManagementModule;

  beforeEach(() => {
    tradersManagementModule = new TradersManagementModule();
  });

  it('should create an instance', () => {
    expect(tradersManagementModule).toBeTruthy();
  });
});
