import { Module, Global } from '@nestjs/common';
import { ClusterModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { EnvironmentVariables } from '@nest-microservice-boilerplate/env';

@Global()
@Module({
  imports: [
    ClusterModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService<EnvironmentVariables>) => ({
        readyLog: true,
        config: {
          nodes: [
            {
              host: config.get('redisHost'),
              port: config.get('redisPort'),
            },
          ],
          options: {
            clusterRetryStrategy: (times: number) =>
              Math.min(100 + times * 2, 2000),
            enableReadyCheck: true,
            slotsRefreshTimeout: 2000,
            scaleReads: 'slave',
          },
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
