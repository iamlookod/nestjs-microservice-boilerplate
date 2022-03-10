import {
  CreateUserInput,
  UpdateUserInput,
  DeleteUserOutput,
} from '@nest-microservice-boilerplate/interface';
import { User } from '@nest-microservice-boilerplate/mongo';
import { Types } from 'mongoose';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.userService.findOne(_id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => DeleteUserOutput)
  removeUser(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.userService.remove(_id);
  }
}
