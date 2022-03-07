import { EnvModule } from '@nest-microservice-boilerplate/env';
import { HealthModule } from '@nest-microservice-boilerplate/health';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
