import { CommissionSectionModule } from './commission-section.module';

describe('CommissionSectionModule', () => {
  let commissionSectionModule: CommissionSectionModule;

  beforeEach(() => {
    commissionSectionModule = new CommissionSectionModule();
  });

  it('should create an instance', () => {
    expect(commissionSectionModule).toBeTruthy();
  });
});
