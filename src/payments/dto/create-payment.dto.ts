import { ApiProperty } from '@nestjs/swagger';
import { BillingType } from 'src/types/billing-type.enum';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID do cliente que irá receber a cobrança',
  })
  customer: string;

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
  billingType: BillingType;

  @ApiProperty({
    required: false,
    description: 'Número de parcelas (somente no caso de cobrança parcelada)',
  })
  installmentCount?: number;

  @ApiProperty({
    required: false,
    description:
      'Informe o valor total de uma cobrança que será parcelada (somente no caso de cobrança parcelada). Caso enviado este campo o installmentValue não é necessário, o cálculo por parcela será automático.',
  })
  totalValue?: number;
}
