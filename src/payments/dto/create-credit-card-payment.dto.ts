import { ApiProperty } from '@nestjs/swagger';

export class CreateCreditCardPaymentDto {
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
    description: 'Dados do cartão de crédito',
    required: true,
    example: {
      holderName: 'Nome do titular',
      number: '1234567890123456',
      expiryMonth: '12',
      expiryYear: '2025',
      ccv: '123',
    },
    type: () => ({
      holderName: { type: 'string', description: 'Nome impresso no cartão' },
      number: { type: 'string', description: 'Número do cartão' },
      expiryMonth: {
        type: 'string',
        description: 'Mês de expiração com 2 dígitos',
      },
      expiryYear: {
        type: 'string',
        description: 'Ano de expiração com 4 dígitos',
      },
      ccv: { type: 'string', description: 'Código de segurança' },
    }),
  })
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };

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
    type: () => ({
      name: {
        type: 'string',
        description: 'Nome do titular do cartão',
        require: true,
      },
      email: {
        type: 'string',
        description: 'Email do titular do cartão',
        require: true,
      },
      cpfCnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do titular do cartão',
        require: true,
      },
      postalCode: { type: 'string', description: 'CEP do titular do cartão' },
      addressNumber: {
        type: 'string',
        description: 'Número do endereço do titular do cartão',
        require: true,
      },
      addressComplement: {
        type: 'string',
        require: false,
        description: 'Complemento do endereço do titular do cartão',
      },
      phone: {
        type: 'string',
        description: 'Telefone com DDD do titular do cartão',
        require: true,
      },
      mobilePhone: {
        type: 'string',
        require: false,
        description: 'Celular do titular do cartão',
      },
    }),
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
