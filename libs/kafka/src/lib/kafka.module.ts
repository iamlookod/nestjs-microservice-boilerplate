import { Module } from '@nestjs/common';
import {
  kafkaClientConfig,
  kafkaMicroserviceConfig,
  kafkaConfig,
} from './kafka.config';
import { createTopic } from './kafka.service';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class KafkaModule {}
export { kafkaConfig, kafkaClientConfig, kafkaMicroserviceConfig, createTopic };
