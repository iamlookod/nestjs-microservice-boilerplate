import { EnvModule } from '@nest-microservice-boilerplate/env';
import { HealthModule } from '@nest-microservice-boilerplate/health';
import { PrismaModule } from '@nest-microservice-boilerplate/prisma';
import { RedisModule } from '@nest-microservice-boilerplate/redis';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HealthModule, EnvModule, PrismaModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
