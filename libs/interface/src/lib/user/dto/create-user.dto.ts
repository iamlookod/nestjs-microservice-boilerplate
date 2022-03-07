import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String, { description: 'Username' })
  username: string;

  @Field(() => String, { description: 'Password' })
  password: string;
}
