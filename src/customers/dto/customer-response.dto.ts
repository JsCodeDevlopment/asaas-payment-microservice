import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cpfCnpj: string;

  @ApiProperty({ nullable: true })
  email?: string;

  @ApiProperty({ nullable: true })
  phone?: string;

  @ApiProperty({ nullable: true })
  address?: string;

  @ApiProperty({ nullable: true })
  addressNumber?: string;

  @ApiProperty({ nullable: true })
  province?: string;

  @ApiProperty({ nullable: true })
  postalCode?: string;

  @ApiProperty()
  dateCreated: string;
}
