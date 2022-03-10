import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
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
  _id: MongooseSchema.Types.ObjectId;
}
