import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { EnvironmentVariables } from './config/configuration';
import { validationSchema } from './config/validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
      isGlobal: true,
    }),
  ],
})
export class EnvModule {}
export { EnvironmentVariables };
