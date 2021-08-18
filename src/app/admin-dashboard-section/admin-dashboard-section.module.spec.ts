import { AdminDashboardSectionModule } from './admin-dashboard-section.module';

describe('AdminDashboardSectionModule', () => {
  let adminDashboardSectionModule: AdminDashboardSectionModule;

  beforeEach(() => {
    adminDashboardSectionModule = new AdminDashboardSectionModule();
  });

  it('should create an instance', () => {
    expect(adminDashboardSectionModule).toBeTruthy();
  });
});
