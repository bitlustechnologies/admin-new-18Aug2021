import { ZadminModule } from './zadmin.module';

describe('ZadminModule', () => {
  let zadminModule: ZadminModule;

  beforeEach(() => {
    zadminModule = new ZadminModule();
  });

  it('should create an instance', () => {
    expect(zadminModule).toBeTruthy();
  });
});
