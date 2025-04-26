import { Injectable } from '@nestjs/common';
import { AsaasService } from '../asaas/asaas.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly asaas: AsaasService) {}

  create(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const payload: any = {
      customer: dto.customerId,
      billingType: dto.billingType,
      value: dto.value,
      dueDate: dto.dueDate,
    };
    if (dto.installmentCount && dto.installmentCount > 1) {
      payload.installmentCount = dto.installmentCount;
      payload.totalValue = dto.totalValue;
    }
    return this.asaas.request<PaymentResponseDto>('post', '/payments', payload);
  }

  findInstallments(installmentId: string) {
    return this.asaas.request<any>(
      'get',
      `/installments/${installmentId}/payments`,
    );
  }
}
