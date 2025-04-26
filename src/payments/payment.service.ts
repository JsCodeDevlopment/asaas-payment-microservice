import { Injectable } from '@nestjs/common';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly asaas: AsaasService) {}

  async create(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
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

    return this.asaas.request<PaymentResponseDto>('post', '/payments', dto);
  }

  findInstallments(installmentId: string) {
    return this.asaas.request<any>(
      'get',
      `/installments/${installmentId}/payments`,
    );
  }
}
