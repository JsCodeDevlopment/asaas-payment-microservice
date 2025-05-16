import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsType } from 'src/types/request-methods.enum';
import { AsaasConfig } from '../config/asaas.config';
import { CreateWebhookDto } from '../webhooks/dto/create-webhook.dto';

@Injectable()
export class AsaasService {
  private cfg: AsaasConfig;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    const config = this.configService.get<AsaasConfig>('asaas');
    if (!config) {
      throw new Error('Asaas configuration not found');
    }
    this.cfg = config;
  }

  async request<T, Y = undefined>(
    method: RequestMethodsType,
    path: string,
    body: Y,
    accessToken: string,
    environment: EnvironmentOptionsType = 'PROD',
    params?: any,
  ): Promise<T> {
    const baseURL =
      environment === 'PROD' ? this.cfg.baseUrl : this.cfg.sandboxUrl;

    const response = await lastValueFrom(
      this.http.request<T>({
        method,
        url: path,
        data: body,
        baseURL,
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
        params: {
          ...params,
        },
      }),
    );
    return response.data;
  }

  async createWebhook(
    dto: CreateWebhookDto,
    accessToken: string,
    environment: EnvironmentOptionsType = 'PROD',
  ) {
    return this.request(
      'POST',
      '/api/v3/webhooks',
      dto,
      accessToken,
      environment,
    );
  }
}
