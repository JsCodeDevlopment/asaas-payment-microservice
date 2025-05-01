import { ApiProperty } from '@nestjs/swagger';
import { BillingType, BillingTypeEnum } from 'src/types/billing-type.enum';
import { CardBrandsEnum, CardBrandsType } from 'src/types/card-brands.enum';
import {
  PaymentStatus,
  PaymentStatusEnum,
} from 'src/types/payment-status.enum';

export class CreditCardPaymentResponseDto {
  @ApiProperty({
    description: 'Identificador único da cobrança no Asaas',
    type: String,
    example: 'pay_1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Status da cobrança',
    enum: PaymentStatusEnum,
    example: PaymentStatusEnum.PENDING,
  })
  status: PaymentStatus;

  @ApiProperty({
    description: 'Data de vencimento da cobrança',
    type: String,
    format: 'date',
    example: '2024-06-30',
  })
  dueDate: string;

  @ApiProperty({
    description: 'Data de criação da cobrança',
    type: String,
    format: 'date-time',
    example: '2024-06-01T12:00:00Z',
  })
  dateCreated: string;

  @ApiProperty({
    description: 'Identificador único do cliente ao qual a cobrança pertence',
    type: String,
    example: 'cus_1234567890abcdef',
  })
  customer: string;

  @ApiProperty({
    description: 'Número da parcela',
    type: String,
    example: '1',
  })
  installments: string;

  @ApiProperty({
    description:
      'Identificador único do link de pagamentos ao qual a cobrança pertence',
    type: String,
    example: 'paylink_1234567890abcdef',
  })
  paymentLink: string;

  @ApiProperty({
    description: 'Forma de pagamento',
    enum: BillingTypeEnum,
    example: BillingTypeEnum.CREDIT_CARD,
  })
  billingType: BillingType;

  @ApiProperty({
    description:
      'Identificador único do QrCode estático gerado para determinada chave Pix',
    type: String,
    example: 'qr_1234567890abcdef',
  })
  pixQrCodeId: string;

  @ApiProperty({
    description: 'Valor da cobrança',
    type: Number,
    example: 100.5,
  })
  value: number;

  @ApiProperty({
    description: 'Informações do cartão de crédito utilizado no pagamento',
    type: 'object',
    properties: {
      creditCardNumber: {
        type: 'string',
        description: 'Últimos 4 dígitos do cartão utilizado',
        example: '1234',
      },
      creditCardBrand: {
        type: 'string',
        description: 'Bandeira do cartão utilizado',
        enum: CardBrandsEnum,
        example: CardBrandsEnum.VISA,
      },
      creditCardToken: {
        type: 'string',
        description:
          'Token do cartão de crédito caso a tokenização esteja ativa.',
        example: 'token_abcdef123456',
      },
    },
  })
  creditCard?: {
    creditCardNumber: string;
    creditCardBrand: CardBrandsType;
    creditCardToken: string;
  };
}
