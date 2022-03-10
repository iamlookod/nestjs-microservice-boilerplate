import {
  MongoModule,
  User,
  UserDocument,
  UserSchema,
} from '@nest-microservice-boilerplate/mongo';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = (
  _id = '62296dc8c1f3bf7a236aa87c',
  username = 'test',
  password = 'test',
  createdAt = new Date(),
  updatedAt = new Date()
): Pick<User, '_id' | 'username' | 'password' | 'createdAt' | 'updatedAt'> => ({
  _id,
  username,
  password,
  createdAt,
  updatedAt,
});

describe('AppService', () => {
  let service: AppService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken('User'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    model = module.get<Model<UserDocument>>(getModelToken('User'));
  });

  // beforeAll(async () => {
  //   const app = await Test.createTestingModule({
  //     providers: [
  //       AppService,
  //       {
  //         provide: getModelToken(User.name),
  //         useValue: {
  //           new: jest.fn().mockResolvedValue(mockUser()),
  //           constructor: jest.fn().mockResolvedValue(mockUser()),
  //           find: jest.fn(),
  //           findOne: jest.fn(),
  //           update: jest.fn(),
  //           create: jest.fn(),
  //           remove: jest.fn(),
  //           exec: jest.fn(),
  //         },
  //       },
  //     ],
  //   }).compile();

  //   service = app.get<AppService>(AppService);
  //   model = app.get<Model<UserDocument>>(getModelToken(User.name));
  // });

  describe('getData', () => {
    it('should return "Welcome to user!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to user!' });
    });
  });
});
