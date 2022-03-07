import {
  CreateUserDto,
  UpdateUserDto,
  UserEvent,
} from '@nest-microservice-boilerplate/interface';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
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

  create(createUserDto: CreateUserDto) {
    return this.userClient.send(UserEvent.CREATE_USER, createUserDto);
  }

  findAll() {
    return this.userClient.send(UserEvent.FIND_ALL_USER, {});
  }

  findOne(id: number) {
    return this.userClient.send(UserEvent.FIND_ONE_USER, { id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userClient.send(UserEvent.UPDATE_USER, {
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userClient.send(UserEvent.REMOVE_USER, { id });
  }
}
