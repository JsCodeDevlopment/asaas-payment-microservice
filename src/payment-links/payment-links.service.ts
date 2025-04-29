import { Injectable } from '@nestjs/common';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLinkResponseDto } from './dto/payment-link-response.dto';

@Injectable()
export class PaymentLinksService {
  constructor(private readonly asaas: AsaasService) {}

  create(
    dto: CreatePaymentLinkDto,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<PaymentLinkResponseDto> {
    return this.asaas.request<PaymentLinkResponseDto, CreatePaymentLinkDto>(
      RequestMethodsEnum.POST,
      '/paymentLinks',
      dto,
      token,
      environment,
    );
  }

  findAll(
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<PaymentLinkResponseDto[]> {
    return this.asaas.request<PaymentLinkResponseDto[], undefined>(
      RequestMethodsEnum.GET,
      '/paymentLinks',
      undefined,
      token,
      environment,
    );
  }

  findOne(
    id: string,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<PaymentLinkResponseDto> {
    return this.asaas.request<PaymentLinkResponseDto, undefined>(
      RequestMethodsEnum.GET,
      `/paymentLinks/${id}`,
      undefined,
      token,
      environment,
    );
  }
}
