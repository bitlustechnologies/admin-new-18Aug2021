import { EarningManagementModule } from './earning-management.module';

describe('EarningManagementModule', () => {
  let earningManagementModule: EarningManagementModule;

  beforeEach(() => {
    earningManagementModule = new EarningManagementModule();
  });

  it('should create an instance', () => {
    expect(earningManagementModule).toBeTruthy();
  });
});
