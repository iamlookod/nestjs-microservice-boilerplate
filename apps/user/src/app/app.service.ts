import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateUserInput,
  UpdateUserInput,
} from '@nest-microservice-boilerplate/interface';
import { User, UserDocument } from '@nest-microservice-boilerplate/mongo';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to user!' };
  }

  async create(payload: CreateUserInput) {
    return this.userModel.create(payload);
  }

  async findAll() {
    return this.userModel.find().lean();
  }

  async findOne(_id: Types.ObjectId) {
    return this.userModel.findById(_id).lean();
  }

  async update(_id: Types.ObjectId, payload: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(_id, payload).lean();
  }

  async remove(_id: Types.ObjectId) {
    return this.userModel
      .findByIdAndDelete(_id)
      .then(() => ({ deleted: true }))
      .catch(() => ({ deleted: false }));
  }
}
