import { TestBed, inject } from '@angular/core/testing';

import { SubAdminService } from './sub-admin.service';

describe('SubAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubAdminService]
    });
  });

  it('should be created', inject([SubAdminService], (service: SubAdminService) => {
    expect(service).toBeTruthy();
  }));
});
