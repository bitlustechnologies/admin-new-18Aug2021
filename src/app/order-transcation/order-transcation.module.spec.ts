import { OrderTranscationModule } from './order-transcation.module';

describe('OrderTranscationModule', () => {
  let orderTranscationModule: OrderTranscationModule;

  beforeEach(() => {
    orderTranscationModule = new OrderTranscationModule();
  });

  it('should create an instance', () => {
    expect(orderTranscationModule).toBeTruthy();
  });
});
