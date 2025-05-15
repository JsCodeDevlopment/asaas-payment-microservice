import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { formatError } from 'src/helpers/format-error.helper';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLinkResponseDto } from './dto/payment-link-response.dto';

@Injectable()
export class PaymentLinksService {
  constructor(private readonly asaas: AsaasService) {}

  async create(
    dto: CreatePaymentLinkDto,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PaymentLinkResponseDto> {
    try {
      return await this.asaas.request<
        PaymentLinkResponseDto,
        CreatePaymentLinkDto
      >(RequestMethodsEnum.POST, '/paymentLinks', dto, token, environment);
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async findAll(
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PaymentLinkResponseDto[]> {
    try {
      return await this.asaas.request<PaymentLinkResponseDto[], undefined>(
        RequestMethodsEnum.GET,
        '/paymentLinks',
        undefined,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async findOne(
    id: string,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PaymentLinkResponseDto> {
    try {
      return await this.asaas.request<PaymentLinkResponseDto, undefined>(
        RequestMethodsEnum.GET,
        `/paymentLinks/${id}`,
        undefined,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }
}
