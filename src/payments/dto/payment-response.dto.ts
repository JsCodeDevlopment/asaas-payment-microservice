import { ApiProperty } from '@nestjs/swagger';
import { BillingType } from 'src/types/billing-type.enum';
import { PaymentStatus } from 'src/types/payment-status.enum';

export class PaymentResponseDto {
  @ApiProperty({
    description: 'Identificador único da cobrança no Asaas',
    type: String,
    example: 'pay_1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Status da cobrança',
    enum: [
      'PENDING',
      'RECEIVED',
      'CONFIRMED',
      'OVERDUE',
      'REFUNDED',
      'RECEIVED_IN_CASH',
      'REFUND_REQUESTED',
      'REFUND_IN_PROGRESS',
      'CHARGEBACK_REQUESTED',
      'CHARGEBACK_DISPUTE',
      'AWAITING_CHARGEBACK_REVERSAL',
      'DUNNING_REQUESTED',
      'DUNNING_RECEIVED',
      'AWAITING_RISK_ANALYSIS',
    ],
    example: 'PENDING',
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
    enum: ['BOLETO', 'CREDIT_CARD', 'PIX'],
    example: 'PIX',
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
}
