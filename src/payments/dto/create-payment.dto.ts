import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID do cliente que irá receber a cobrança',
  })
  customerId: string;

  @ApiProperty({
    example: 100.0,
    description:
      'Valor da cobrança individual de cada parcela (caso totalValue não seja informado) ou valor base para cálculo das parcelas',
  })
  value: number;

  @ApiProperty({
    example: '2025-05-01',
    description: 'Data de vencimento da cobrança ou da primeira parcela',
  })
  dueDate: string;

  @ApiProperty({
    example: 'BOLETO',
    description: 'Tipo de cobrança: BOLETO, CREDIT_CARD ou PIX',
  })
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX';

  @ApiProperty({
    required: false,
    description:
      'Valor total da cobrança. Se preenchido, o valor de cada parcela será calculado automaticamente considerando value e totalValue.',
  })
  totalValue?: number;
}
