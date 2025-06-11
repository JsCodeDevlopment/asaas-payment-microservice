import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BasePaymentValidation,
  CreditCardValidation,
} from '../types/payment-validation.type';

@Injectable()
export class PaymentValidationService {
  validateBasePayment(data: BasePaymentValidation): void {
    if (!data.customer) {
      throw new BadRequestException('O campo customer é obrigatório.');
    }
    if (!data.value && !data.totalValue) {
      throw new BadRequestException(
        'O campo value ou totalValue é obrigatório.',
      );
    }
    if (!data.dueDate) {
      throw new BadRequestException('O campo dueDate é obrigatório.');
    }
  }

  validateCreditCardPayment(data: CreditCardValidation): void {
    this.validateBasePayment(data);

    if (!data.remoteIp) {
      throw new BadRequestException('O campo remoteIp é obrigatório.');
    }

    if (!data.creditCardHolderInfo) {
      throw new BadRequestException(
        'As informações do titular do cartão são obrigatórias.',
      );
    }

    if (!data.creditCardHolderInfo.name) {
      throw new BadRequestException('O nome do titular é obrigatório.');
    }
    if (!data.creditCardHolderInfo.email) {
      throw new BadRequestException('O email do titular é obrigatório.');
    }
    if (!data.creditCardHolderInfo.cpfCnpj) {
      throw new BadRequestException('O CPF/CNPJ do titular é obrigatório.');
    }
    if (!data.creditCardHolderInfo.postalCode) {
      throw new BadRequestException('O CEP do titular é obrigatório.');
    }
    if (!data.creditCardHolderInfo.addressNumber) {
      throw new BadRequestException(
        'O número do endereço do titular é obrigatório.',
      );
    }
    if (!data.creditCardHolderInfo.phone) {
      throw new BadRequestException('O telefone do titular é obrigatório.');
    }

    if (data.encryptedCreditCard && !data.encryptedCreditCard.encryptedData) {
      throw new BadRequestException(
        'Os dados criptografados do cartão são obrigatórios.',
      );
    }
  }
}
