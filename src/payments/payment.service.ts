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

@Injectable()
export class PaymentsService {
  constructor(
    private readonly asaas: AsaasService,
    private readonly encryptionService: EncryptionService,
  ) {}

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

  /**
   * Cria uma cobrança via cartão de crédito com dados não criptografados.
   *
   * Este método realiza as seguintes validações antes de processar o pagamento:
   * - Verifica se o ID do cliente (customer) foi informado
   * - Verifica se o valor (value) ou valor total (totalValue) foi informado
   * - Verifica se a data de vencimento (dueDate) foi informada
   * - Verifica se os dados do cartão de crédito (creditCard) foram informados
   * - Verifica se as informações do titular do cartão (creditCardHolderInfo) foram informadas
   * - Verifica se o IP remoto (remoteIp) foi informado
   *
   * Após as validações, o método faz uma requisição POST para a API do Asaas
   * com os dados do pagamento, incluindo o tipo de cobrança como 'CREDIT_CARD'.
   *
   * @param dto - DTO contendo os dados do pagamento, incluindo informações do cartão de crédito
   * @param token - Token de acesso para autenticação na API do Asaas
   * @param environment - Ambiente da API (PROD ou SANDBOX). Padrão: 'PROD'
   * @returns Promise<PaymentResponseDto> - Resposta da API contendo os dados da cobrança criada
   * @throws BadRequestException - Se algum campo obrigatório não for informado
   * @throws AxiosError - Se houver erro na comunicação com a API do Asaas
   */
  async createSecureCreditCardPayment(
    dto: EncryptedCreditCardPaymentDto,
    token: string,
    environment: EnvironmentOptionsType,
  ): Promise<CreditCardPaymentResponseDto> {
    const decryptedData = this.encryptionService.decrypt(
      dto.encryptedCreditCard.encryptedData,
    );
    const creditCardData = JSON.parse(decryptedData);

    const regularDto: CreateCreditCardPaymentDto = {
      ...dto,
      creditCard: creditCardData,
    };

    return this.createCreditCardPayment(regularDto, token, environment);
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
