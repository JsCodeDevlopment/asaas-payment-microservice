import { ApiProperty } from '@nestjs/swagger';
import { WebhookEventType } from './create-webhook.dto';

export class PaymentInfo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  dateCreated: string;

  @ApiProperty()
  customer: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  netValue: number;

  @ApiProperty()
  billingType: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  dueDate: string;

  @ApiProperty()
  originalDueDate: string;

  @ApiProperty({ required: false })
  invoiceUrl?: string;

  @ApiProperty({ required: false })
  invoiceNumber?: string;

  @ApiProperty({ required: false })
  externalReference?: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  anticipated: boolean;

  @ApiProperty()
  anticipable: boolean;

  @ApiProperty()
  creditDate: string;

  @ApiProperty()
  estimatedCreditDate: string;

  @ApiProperty({ required: false })
  transactionReceiptUrl?: string;

  @ApiProperty({ required: false })
  nossoNumero?: string;

  @ApiProperty({ required: false })
  bankSlipUrl?: string;

  @ApiProperty({ required: false })
  lastInvoiceViewedDate?: string;

  @ApiProperty({ required: false })
  lastBankSlipViewedDate?: string;

  @ApiProperty()
  postalService: boolean;

  @ApiProperty({ required: false })
  custody?: any;

  @ApiProperty({ required: false })
  refunds?: any;
}

export class WebhookPayloadDto {
  @ApiProperty({ enum: WebhookEventType })
  event: WebhookEventType;

  @ApiProperty({ type: PaymentInfo })
  payment: PaymentInfo;
}
