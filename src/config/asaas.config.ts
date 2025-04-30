import { registerAs } from '@nestjs/config';

export interface AsaasConfig {
  baseUrl: string;
  sandboxUrl: string;
}

export default registerAs('asaas', (): AsaasConfig => {
  const baseUrl = process.env.ASAAS_BASE_URL ?? '';
  const sandboxUrl = process.env.ASAAS_SANDBOX_BASE_URL ?? '';

  return {
    baseUrl,
    sandboxUrl,
  };
});
