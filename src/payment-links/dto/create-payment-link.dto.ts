import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentLinkDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ example: 100.0 })
  value: number;

  @ApiProperty({ example: 'UNDEFINED' })
  billingType: 'UNDEFINED' | 'BOLETO' | 'CREDIT_CARD' | 'PIX';

  @ApiProperty({ example: 'DETACHED' })
  chargeType: 'DETACHED' | 'INSTALLMENT';

  @ApiProperty({ required: false })
  dueDateLimitDays?: number;

  @ApiProperty({ required: false })
  maxInstallmentCount?: number;
}
