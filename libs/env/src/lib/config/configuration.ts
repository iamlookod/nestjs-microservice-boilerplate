export interface EnvironmentVariables {
  isProduction: boolean;
  appEnv: string;
  port: number;
  mongodbURI: string;
  redisHost: string;
  redisPort: number;
  kafkaURL: string;
  kafkaApiKey: string;
  kafkaApiSecret: string;
}

export default (): EnvironmentVariables => ({
  isProduction: process.env.NODE_ENV === 'production',
  appEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbURI: process.env.MONGODB_URI,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10) || 6379,
  kafkaURL: process.env.KAFKA_URL,
  kafkaApiKey: process.env.KAFKA_API_KEY,
  kafkaApiSecret: process.env.KAFKA_API_SECRET,
});
