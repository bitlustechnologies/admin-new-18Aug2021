import { LiquidityManagementSectionModule } from './liquidity-management-section.module';

describe('LiquidityManagementSectionModule', () => {
  let liquidityManagementSectionModule: LiquidityManagementSectionModule;

  beforeEach(() => {
    liquidityManagementSectionModule = new LiquidityManagementSectionModule();
  });

  it('should create an instance', () => {
    expect(liquidityManagementSectionModule).toBeTruthy();
  });
});
