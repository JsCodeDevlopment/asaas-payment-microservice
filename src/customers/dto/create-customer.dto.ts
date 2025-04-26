import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpfCnpj: string;

  @ApiProperty({ example: 'john@example.com' })
  email?: string;

  @ApiProperty({ example: '+5511999998888' })
  phone?: string;

  @ApiProperty({ example: 'Rua Exemplo' })
  address?: string;

  @ApiProperty({ example: '51' })
  addressNumber?: string;

  @ApiProperty({ example: 'Bairro Exemplo' })
  province?: string;

  @ApiProperty({ example: '63100000' })
  postalCode?: string;
}
