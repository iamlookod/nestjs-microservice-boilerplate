import { InputType, Field, PartialType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Username' })
  username: string;

  @Field(() => String, { description: 'Password' })
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: Types.ObjectId;
}

@ObjectType()
export class DeleteUserOutput {
  @Field()
  deleted: boolean;
}
