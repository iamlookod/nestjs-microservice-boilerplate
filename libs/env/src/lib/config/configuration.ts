export interface EnvironmentVariables {
  isProduction: boolean;
  appEnv: string;
  port: number;
}

export default (): EnvironmentVariables => ({
  isProduction: process.env.NODE_ENV === 'production',
  appEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
});
