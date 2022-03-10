import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema } from './base.schema';

export type UserDocument = User & Document;

@ObjectType()
@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  username: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
