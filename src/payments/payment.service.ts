import { Injectable } from '@nestjs/common';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly asaas: AsaasService) {}

  async create(
    dto: CreatePaymentDto,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<PaymentResponseDto> {
    if (!dto.customerId) {
      throw new Error('O campo customerId é obrigatório.');
    }
    if (!dto.billingType) {
      throw new Error('O campo billingType é obrigatório.');
    }
    if (dto.value === undefined || dto.value === null) {
      throw new Error('O campo value é obrigatório.');
    }
    if (!dto.dueDate) {
      throw new Error('O campo dueDate é obrigatório.');
    }

    return this.asaas.request<PaymentResponseDto, CreatePaymentDto>(
      RequestMethodsEnum.POST,
      '/payments',
      dto,
      token,
      environment,
    );
  }

  findInstallments(
    installmentId: string,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<any> {
    return this.asaas.request<any, undefined>(
      RequestMethodsEnum.GET,
      `/installments/${installmentId}/payments`,
      undefined,
      token,
      environment,
    );
  }
}
