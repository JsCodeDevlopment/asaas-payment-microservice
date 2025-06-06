import { ApiProperty } from '@nestjs/swagger';

export class EncryptedCreditCardPaymentDto {
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

  @ApiProperty({
    description: 'Dados do cartão de crédito criptografados',
    required: true,
    example: {
      encryptedData: 'base64_encrypted_string',
    },
  })
  encryptedCreditCard: {
    encryptedData: string;
  };

  @ApiProperty({
    description: 'Dados do cartão de crédito',
    required: true,
    example: {
      holderName: 'Nome do titular',
      expiryMonth: '12',
      expiryYear: '2025',
    },
  })
  creditCard: {
    holderName: string;
    expiryMonth: string;
    expiryYear: string;
  };

  @ApiProperty({
    description: 'Mês de expiração do cartão de crédito',
    example: '12',
    required: true,
  })
  expiryMonth: string;

  @ApiProperty({
    description: 'Ano de expiração do cartão de crédito',
    example: '2025',
    required: true,
  })
  expiryYear: string;

  @ApiProperty({
    description: 'Informações do titular do cartão de crédito',
    example: {
      name: 'Nome do titular',
      email: 'name@mail.com',
      cpfCnpj: '12345678909',
      postalCode: '12345678',
      addressNumber: '123',
      addressComplement: 'Apto 123',
      phone: '1234567890',
      mobilePhone: '1234567890',
    },
  })
  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string;
    phone: string;
    mobilePhone?: string;
  };

  @ApiProperty({
    description:
      'IP de onde o cliente está fazendo a compra. Não deve ser informado o IP do seu servidor.',
    type: 'string',
    example: '1b67:5bcb:f9da:0e6f:bc5a:5a9c:b299:b66a',
    required: true,
  })
  remoteIp: string;
}
