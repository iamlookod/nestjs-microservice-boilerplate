import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class InterfaceModule {}
export * from './incoming-message.interface';
export * from './dto';
export * from './event';
