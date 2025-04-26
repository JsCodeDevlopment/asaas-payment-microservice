import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentLinkDto {
  @ApiProperty({ description: 'Nome do link de pagamento.' })
  name: string;

  @ApiProperty({ description: 'Descrição opcional do link de pagamento.' })
  description?: string;

  @ApiProperty({
    example: 100.0,
    description: 'Valor a ser cobrado pelo link de pagamento.',
  })
  value: number;

  @ApiProperty({
    example: 'UNDEFINED',
    description: 'Tipo de cobrança: UNDEFINED, BOLETO, CREDIT_CARD ou PIX.',
  })
  billingType: 'UNDEFINED' | 'BOLETO' | 'CREDIT_CARD' | 'PIX';

  @ApiProperty({
    example: 'DETACHED',
    description:
      'Tipo de link: DETACHED (avulso), INSTALLMENT (parcelado) ou RECURRENT (recorrente).',
  })
  chargeType: 'DETACHED' | 'INSTALLMENT' | 'RECURRENT';

  @ApiProperty({
    required: false,
    description:
      'Quantidade máxima de dias para vencimento após a geração do link.',
  })
  dueDateLimitDays?: number;

  @ApiProperty({
    required: false,
    description: 'Número máximo de parcelas permitidas para pagamento.',
  })
  maxInstallmentCount?: number;
}
