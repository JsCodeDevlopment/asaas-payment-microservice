import { registerAs } from '@nestjs/config';

export interface AsaasConfig {
  apiKey: string;
  baseUrl: string;
}

export default registerAs('asaas', (): AsaasConfig => {
  const apiKey = process.env.ASAAS_API_KEY ?? '';
  const baseUrl = process.env.ASAAS_BASE_URL ?? '';

  return {
    apiKey,
    baseUrl,
  };
});
