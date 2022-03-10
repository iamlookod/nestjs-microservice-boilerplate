/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserDocument } from '@nest-microservice-boilerplate/mongo';
import { Model, Query, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { AppService } from './app.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = (
  _id = new Types.ObjectId('62296dc8c1f3bf7a236aa87a'),
  username = 'test',
  password = 'test'
): Pick<User, '_id' | 'username' | 'password'> => ({
  _id,
  username,
  password,
});

const mockUsers: Pick<User, '_id' | 'username' | 'password'>[] = [
  mockUser(),
  mockUser(new Types.ObjectId('62296dc8c1f3bf7a236aa87b'), 'test2', 'test2'),
  mockUser(new Types.ObjectId('62296dc8c1f3bf7a236aa87c'), 'test3', 'test3'),
];

describe('AppService', () => {
  let service: AppService;
  let model: Model<UserDocument>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn(),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockUser()),
            exec: jest.fn(),
            lean: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
    model = app.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Health Check', () => {
    it('should return "Welcome to user!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to user!' });
    });
  });

  describe('User', () => {
    it('should return all users', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        lean: jest.fn().mockResolvedValueOnce(mockUsers),
      } as any);
      const users = await service.findAll();
      expect(users).toEqual(mockUsers);
    });

    it('should findOne by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<Query<UserDocument, UserDocument>>({
          lean: jest.fn().mockResolvedValueOnce(mockUser()),
        }) as any
      );

      const findMockUser = mockUser();
      const foundUser = await service.findOne(mockUser()._id);
      expect(foundUser).toEqual(findMockUser);
    });

    it('should create a user', async () => {
      const initUser = mockUser(
        new Types.ObjectId('62296dc8c1f3bf7a236aa87d'),
        'test-create',
        'test-create'
      );
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(initUser));
      const newUser = await service.create({
        username: 'test-create',
        password: 'test-create',
      });

      expect(newUser).toEqual(initUser);
    });

    it('should update a user successfully', async () => {
      const initUser = {
        ...mockUser(),
        username: 'test-update',
        password: 'test-update',
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
        createMock<Query<UserDocument, UserDocument>>({
          lean: jest.fn().mockResolvedValueOnce(initUser),
        }) as any
      );
      const updatedUser = await service.update(initUser._id, initUser);
      expect(updatedUser).toEqual(initUser);
    });

    it('should delete a user successfully', async () => {
      const user = mockUser();

      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce({ deleted: true });

      const removeUser = await service.remove(user._id);

      expect(removeUser).toEqual({ deleted: true });
    });
  });
});
