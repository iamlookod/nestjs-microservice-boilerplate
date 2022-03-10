import { User, UserSchema } from '@nest-microservice-boilerplate/mongo';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './user.controller';
import { AppService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
