import { EnvModule } from '@nest-microservice-boilerplate/env';
import { HealthModule } from '@nest-microservice-boilerplate/health';
import {
  MongoModule,
  User,
  UserSchema,
} from '@nest-microservice-boilerplate/mongo';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    EnvModule,
    HealthModule,
    MongoModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
