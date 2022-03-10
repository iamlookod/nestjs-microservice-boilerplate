import {
  IncomingMessage,
  CreateUserInput,
  UpdateUserInput,
} from '@nest-microservice-boilerplate/interface';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('createUser')
  async create(@Payload() message: IncomingMessage<CreateUserInput>) {
    const user = message.value;
    return this.appService.create(user).then((doc) => doc.toObject());
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() message: IncomingMessage<{ _id: Types.ObjectId }>) {
    const { _id } = message.value;
    return this.appService.findOne(_id);
  }

  @MessagePattern('updateUser')
  update(@Payload() message: IncomingMessage<UpdateUserInput>) {
    const user = message.value;
    const { _id } = user;
    return this.appService.update(_id, { ...user });
  }

  @MessagePattern('removeUser')
  remove(@Payload() message: IncomingMessage<{ _id: Types.ObjectId }>) {
    const { _id } = message.value;
    return this.appService.remove(_id);
  }
}
