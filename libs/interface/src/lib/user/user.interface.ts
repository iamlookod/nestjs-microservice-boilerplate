import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Id' })
  id: number;

  @Field(() => String, { description: 'Username' })
  username: string;

  @Field(() => String, { description: 'Password' })
  password: string;
}

export enum UserEvent {
  CREATE_USER = 'createUser',
  FIND_ALL_USER = 'findAllUser',
  FIND_ONE_USER = 'findOneUser',
  UPDATE_USER = 'updateUser',
  REMOVE_USER = 'removeUser',
}

export { CreateUserDto, UpdateUserDto };
