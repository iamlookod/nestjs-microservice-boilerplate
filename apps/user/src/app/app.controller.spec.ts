import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;
  // let service: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getData: jest
              .fn()
              .mockResolvedValue({ message: 'Welcome to user!' }),
          },
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    // service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getData', () => {
    it('should return "Welcome to user!"', () => {
      expect(controller.getData()).resolves.toEqual({
        message: 'Welcome to user!',
      });
    });
  });
});
