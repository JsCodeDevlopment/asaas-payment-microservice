import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AsaasService } from 'src/asaas/asaas.service';
import asaasConfig, { AsaasConfig } from '../config/asaas.config';

@Global()
@Module({})
export class AsaasModule {
  static registerAsync(): DynamicModule {
    return {
      module: AsaasModule,
      imports: [
        ConfigModule.forFeature(asaasConfig),
        HttpModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (cs: ConfigService): HttpModuleOptions => {
            const cfg = cs.get<AsaasConfig>('asaas');
            if (!cfg?.baseUrl) {
              console.error('Asaas config missing:', cfg);
              throw new Error(
                'Asaas configuration is incomplete. Check baseUrl and apiKey.',
              );
            }
            return {
              baseURL: cfg.baseUrl,
              maxRedirects: 0,
              timeout: 5000,
            };
          },
        }),
      ],
      providers: [AsaasService],
      exports: [AsaasService],
    };
  }
}
