import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { formatError } from 'src/helpers/format-error.helper';
import { CreateCreditCardPaymentDto } from 'src/payments/dto/create-credit-card-payment.dto';
import { ListPaymentsResponseDto } from 'src/payments/dto/list-payments-response.dto';
import { PixInfoResponseDto } from 'src/payments/dto/pix-info-response.dto';
import { ListPaymentsFilters } from 'src/payments/types/get-payments-filters.type';
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
  ): Promise<PaymentResponseDto> {
    try {
      if (!dto.customer) {
        throw new BadRequestException('O campo customer é obrigatório.');
      }
      if (!dto.billingType) {
        throw new BadRequestException('O campo billingType é obrigatório.');
      }
      if (dto.value === undefined || dto.value === null) {
        throw new BadRequestException('O campo value é obrigatório.');
      }
      if (!dto.dueDate) {
        throw new BadRequestException('O campo dueDate é obrigatório.');
      }

      return await this.asaas.request<PaymentResponseDto, CreatePaymentDto>(
        RequestMethodsEnum.POST,
        '/payments',
        dto,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async createCreditCardPayment(
    dto: CreateCreditCardPaymentDto,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PaymentResponseDto> {
    try {
      if (!dto.customer) {
        throw new BadRequestException('O campo customer é obrigatório.');
      }
      if (!dto.value && !dto.totalValue) {
        throw new BadRequestException(
          'O campo value ou totalValue é obrigatório.',
        );
      }
      if (!dto.dueDate) {
        throw new BadRequestException('O campo dueDate é obrigatório.');
      }
      if (!dto.creditCard) {
        throw new BadRequestException(
          'Os dados do cartão de crédito são obrigatórios.',
        );
      }
      if (!dto.creditCardHolderInfo) {
        throw new BadRequestException(
          'As informações do titular do cartão são obrigatórias.',
        );
      }
      if (!dto.remoteIp) {
        throw new BadRequestException('O campo remoteIp é obrigatório.');
      }

      return await this.asaas.request<
        PaymentResponseDto,
        CreateCreditCardPaymentDto & { billingType: string }
      >(
        RequestMethodsEnum.POST,
        '/payments',
        { ...dto, billingType: 'CREDIT_CARD' },
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async getPixInfo(
    paymentId: string,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PixInfoResponseDto> {
    try {
      if (!paymentId) {
        throw new BadRequestException('O campo paymentId é obrigatório.');
      }

      return await this.asaas.request<PixInfoResponseDto, undefined>(
        RequestMethodsEnum.GET,
        `/payments/${paymentId}/pixQrCode`,
        undefined,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async findAllPayments(
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
    params?: ListPaymentsFilters,
  ): Promise<ListPaymentsResponseDto> {
    try {
      return await this.asaas.request<ListPaymentsResponseDto, undefined>(
        RequestMethodsEnum.GET,
        '/payments',
        undefined,
        token,
        environment,
        params,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async deletePayment(
    paymentId: string,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<SuccessResponseDto> {
    try {
      if (!paymentId) {
        throw new BadRequestException('O campo paymentId é obrigatório.');
      }

      await this.asaas.request<undefined, undefined>(
        RequestMethodsEnum.DELETE,
        `/payments/${paymentId}`,
        undefined,
        token,
        environment,
      );
      return { code: 200, message: 'Cobrança excluída com sucesso.' };
    } catch (error) {
      formatError(error as AxiosError);
    }
  }
}
