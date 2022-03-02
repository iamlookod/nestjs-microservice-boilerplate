export interface EnvironmentVariables {
  isProduction: boolean;
  appEnv: string;
  port: number;
  databaseURL: string;
  redisHost: string;
  redisPort: number;
}

export default (): EnvironmentVariables => ({
  isProduction: process.env.NODE_ENV === 'production',
  appEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseURL: process.env.DATABASE_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10) || 6379,
});
