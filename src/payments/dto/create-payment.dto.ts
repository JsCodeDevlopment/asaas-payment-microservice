import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  customerId: string;

  @ApiProperty({ example: 100.0 })
  value: number;

  @ApiProperty({ example: '2025-05-01' })
  dueDate: string;

  @ApiProperty({ example: 'BOLETO' })
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX';

  @ApiProperty({ required: false })
  installmentCount?: number;

  @ApiProperty({ required: false })
  totalValue?: number;
}
