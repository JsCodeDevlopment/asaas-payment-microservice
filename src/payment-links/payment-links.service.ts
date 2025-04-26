import { Injectable } from '@nestjs/common';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLinkResponseDto } from './dto/payment-link-response.dto';

@Injectable()
export class PaymentLinksService {
  constructor(private readonly asaas: AsaasService) {}

  create(dto: CreatePaymentLinkDto): Promise<PaymentLinkResponseDto> {
    return this.asaas.request<PaymentLinkResponseDto>(
      'post',
      '/paymentLinks',
      dto,
    );
  }

  findAll(): Promise<PaymentLinkResponseDto[]> {
    return this.asaas.request<PaymentLinkResponseDto[]>('get', '/paymentLinks');
  }

  findOne(id: string): Promise<PaymentLinkResponseDto> {
    return this.asaas.request<PaymentLinkResponseDto>(
      'get',
      `/paymentLinks/${id}`,
    );
  }
}
