import { LimitManagementModule } from './limit-management.module';

describe('LimitManagementModule', () => {
  let limitManagementModule: LimitManagementModule;

  beforeEach(() => {
    limitManagementModule = new LimitManagementModule();
  });

  it('should create an instance', () => {
    expect(limitManagementModule).toBeTruthy();
  });
});
