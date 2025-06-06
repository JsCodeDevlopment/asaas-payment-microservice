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
import { CreditCardPaymentResponseDto } from './dto/credit-card-payment-response.dto';
import { EncryptedCreditCardPaymentDto } from './dto/encrypted-credit-card-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { EncryptionService } from './services/encryption.service';
import { PaymentValidationService } from './services/payment-validation.service';
import { DecryptedCreditCardData } from './types/decrypted-credit-card.type';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly asaas: AsaasService,
    private readonly encryptionService: EncryptionService,
    private readonly validationService: PaymentValidationService,
  ) {}

  async create(
    dto: CreatePaymentDto,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<PaymentResponseDto> {
    try {
      this.validationService.validateBasePayment(dto);

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
      this.validationService.validateCreditCardPayment(dto);

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

  /**
   * Cria um pagamento seguro com cartão de crédito usando dados criptografados.
   *
   * Este método implementa um fluxo seguro para processamento de pagamentos com cartão de crédito,
   * onde os dados sensíveis do cartão (número, CCV) são recebidos de forma criptografada.
   *
   * O fluxo de funcionamento é:
   * 1. Validação inicial dos dados do pagamento usando PaymentValidationService
   * 2. Descriptografia dos dados do cartão usando EncryptionService
   * 3. Validação dos dados descriptografados
   * 4. Conversão para o formato padrão de pagamento
   * 5. Processamento do pagamento via Asaas
   *
   * @param dto - DTO contendo os dados do pagamento, incluindo:
   *   - Dados básicos (customer, value, dueDate, etc)
   *   - Dados do titular do cartão (creditCardHolderInfo)
   *   - Dados do cartão criptografados (encryptedCreditCard)
   * @param token - Token de autenticação para a API Asaas
   * @param environment - Ambiente de execução (PROD/SANDBOX)
   *
   * @returns Promise<CreditCardPaymentResponseDto> - Resposta do processamento do pagamento
   *
   * @throws {BadRequestException} - Se os dados do cartão forem inválidos após descriptografia
   * @throws {AxiosError} - Se houver erro na comunicação com a API Asaas
   *
   * @example
   * // Exemplo de uso:
   * const payment = await paymentsService.createSecureCreditCardPayment({
   *   customer: 'cus_123',
   *   value: 100.00,
   *   dueDate: '2024-12-31',
   *   encryptedCreditCard: {
   *     encryptedData: 'encrypted_base64_string'
   *   },
   *   creditCardHolderInfo: {
   *     name: 'John Doe',
   *     email: 'john@example.com',
   *     // ... outros dados do titular
   *   },
   *   remoteIp: '127.0.0.1'
   * }, 'asaas_token', 'PROD');
   */
  async createSecureCreditCardPayment(
    dto: EncryptedCreditCardPaymentDto,
    token: string,
    environment: EnvironmentOptionsType,
  ): Promise<CreditCardPaymentResponseDto> {
    try {
      this.validationService.validateCreditCardPayment(dto);

      const decryptedData = this.encryptionService.decrypt(
        dto.encryptedCreditCard.encryptedData,
      );
      const creditCardData = JSON.parse(
        decryptedData,
      ) as DecryptedCreditCardData;

      if (!creditCardData.number || !creditCardData.ccv) {
        throw new BadRequestException(
          'Dados do cartão inválidos após descriptografia.',
        );
      }

      const regularDto: CreateCreditCardPaymentDto = {
        customer: dto.customer,
        value: dto.value,
        dueDate: dto.dueDate,
        installmentCount: dto.installmentCount,
        totalValue: dto.totalValue,
        creditCard: {
          holderName: dto.creditCardHolderInfo.name,
          number: creditCardData.number,
          ccv: creditCardData.ccv,
          expiryMonth: creditCardData.expiryMonth,
          expiryYear: creditCardData.expiryYear,
        },
        creditCardHolderInfo: dto.creditCardHolderInfo,
        remoteIp: dto.remoteIp,
      };

      return this.createCreditCardPayment(regularDto, token, environment);
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
