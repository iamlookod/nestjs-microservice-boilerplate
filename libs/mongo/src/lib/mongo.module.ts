import {
  EnvironmentVariables,
  EnvModule,
} from '@nest-microservice-boilerplate/env';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';

@Global()
@Module({
  imports: [
    EnvModule,
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService<EnvironmentVariables>) => {
        console.log(config.get('mongodbURI'));
        return {
          uri: config.get('mongodbURI'),
          dbName: 'db',
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class MongoModule {}
export * from './schemas';
