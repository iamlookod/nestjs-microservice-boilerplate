import {
  EnvironmentVariables,
  EnvModule,
} from '@nest-microservice-boilerplate/env';
import { HealthModule } from '@nest-microservice-boilerplate/health';
import { MongoModule } from '@nest-microservice-boilerplate/mongo';
// import { kafkaClientConfig } from '@nest-microservice-boilerplate/kafka';
// import { RedisModule } from '@nest-microservice-boilerplate/redis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HealthModule,
    EnvModule,
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
    MongoModule,
    // RedisModule,
    UserModule,
  ],
})
export class AppModule {}
