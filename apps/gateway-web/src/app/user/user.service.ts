import {
  UserEvent,
  CreateUserInput,
  UpdateUserInput,
} from '@nest-microservice-boilerplate/interface';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka
  ) {}

  async onModuleInit() {
    const subscribes: string[] = Object.keys(UserEvent).map(
      (event) => UserEvent[event]
    );
    subscribes.forEach((subscribe) =>
      this.userClient.subscribeToResponseOf(subscribe)
    );
    await this.userClient.connect();
  }

  create(createUserInput: CreateUserInput) {
    return this.userClient.send(UserEvent.CREATE_USER, createUserInput);
  }

  findAll() {
    return this.userClient.send(UserEvent.FIND_ALL_USER, {});
  }

  async findOne(_id: Types.ObjectId) {
    return this.userClient.send(UserEvent.FIND_ONE_USER, { _id });
  }

  update(_id: Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userClient.send(UserEvent.UPDATE_USER, {
      _id,
      ...updateUserInput,
    });
  }

  remove(_id: Types.ObjectId) {
    return this.userClient.send(UserEvent.REMOVE_USER, { _id });
  }
}
