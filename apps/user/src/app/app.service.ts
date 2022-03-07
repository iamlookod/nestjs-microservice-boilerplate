import {
  CreateUserDto,
  UpdateUserDto,
  User,
} from '@nest-microservice-boilerplate/interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  users: User[] = [
    { id: 1, username: 'bob', password: '1234' },
    { id: 2, username: 'john', password: '4567' },
  ];

  getData(): { message: string } {
    return { message: 'Welcome to user!' };
  }

  create(createUserDto: CreateUserDto) {
    const id = this.users[this.users.length - 1].id + 1;
    this.users.push({ ...createUserDto, id });
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.findIndex((user) => user.id === id);
    this.users[user] = {
      ...this.users[user],
      ...updateUserDto,
    };
    return this.users[user];
  }

  remove(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }
}
