import {
  EnvironmentVariables,
  EnvModule,
} from '@nest-microservice-boilerplate/env';
import { HealthModule } from '@nest-microservice-boilerplate/health';
import { PrismaModule } from '@nest-microservice-boilerplate/prisma';
import { RedisModule } from '@nest-microservice-boilerplate/redis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HealthModule,
    EnvModule,
    PrismaModule,
    // RedisModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (config: ConfigService<EnvironmentVariables>) => ({
        autoSchemaFile: true,
        debug: !config.get('isProduction'),
        playground: !config.get('isProduction'),
        introspection: !config.get('isProduction'),
        buildSchemaOptions: {
          dateScalarMode: 'isoDate',
          numberScalarMode: 'integer',
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
