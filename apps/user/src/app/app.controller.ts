import {
  IncomingMessage,
  CreateUserDto,
  UpdateUserDto,
} from '@nest-microservice-boilerplate/interface';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('createUser')
  create(@Payload() message: IncomingMessage<CreateUserDto>) {
    const user = message.value;
    return this.appService.create(user);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() message: IncomingMessage<{ id: number }>) {
    const { id } = message.value;
    return this.appService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() message: IncomingMessage<UpdateUserDto>) {
    const { id, ...user } = message.value;
    return this.appService.update(id, { id, ...user });
  }

  @MessagePattern('removeUser')
  remove(@Payload() message: IncomingMessage<{ id: number }>) {
    const { id } = message.value;
    return this.appService.remove(id);
  }
}
