import { SubAdminManagementModule } from './sub-admin-management.module';

describe('SubAdminManagementModule', () => {
  let subAdminManagementModule: SubAdminManagementModule;

  beforeEach(() => {
    subAdminManagementModule = new SubAdminManagementModule();
  });

  it('should create an instance', () => {
    expect(subAdminManagementModule).toBeTruthy();
  });
});
