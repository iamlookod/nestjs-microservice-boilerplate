import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  let app: TestingModule;
  let controller: HealthController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = app.get<HealthController>(HealthController);
  });

  describe('getHealthCheck', () => {
    it('should be health check ok', () => {
      const response = controller.health();
      expect(response).toEqual({ status: 'ok', statusCode: 200 });
    });
  });
});
