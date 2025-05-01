import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { formatError } from 'src/helpers/format-error.helper';
import { ListPaymentsResponseDto } from 'src/payments/dto/list-payments-response.dto';
import { ListPaymentsFilters } from 'src/payments/types/get-payments-filters.type';
import { ErrorResponseDto } from 'src/types/dto/error-response.dto';
import { SuccessResponseDto } from 'src/types/dto/success-response.dto';
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
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PaymentResponseDto | ErrorResponseDto> {
    try {
      if (!dto.customer) {
        throw new Error('O campo customer é obrigatório.');
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

      return await this.asaas.request<PaymentResponseDto, CreatePaymentDto>(
        RequestMethodsEnum.POST,
        '/payments',
        dto,
        token,
        environment,
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      return formatError(axiosError);
    }
  }

  async findAllPayments(
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
    params?: ListPaymentsFilters,
  ): Promise<ListPaymentsResponseDto | ErrorResponseDto> {
    try {
      return await this.asaas.request<any, undefined>(
        RequestMethodsEnum.GET,
        '/payments',
        undefined,
        token,
        environment,
        params,
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      return formatError(axiosError);
    }
  }

  async deletePayment(
    paymentId: string,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<SuccessResponseDto | ErrorResponseDto> {
    try {
      if (!paymentId) {
        return {
          code: 400,
          message: 'O campo paymentId é obrigatório.',
        };
      }

      await this.asaas.request<any, undefined>(
        RequestMethodsEnum.DELETE,
        `/payments/${paymentId}`,
        undefined,
        token,
        environment,
      );
      return { code: 200, message: 'Cobrança excluída com sucesso.' };
    } catch (error) {
      const axiosError = error as AxiosError;
      return formatError(axiosError);
    }
  }
}
