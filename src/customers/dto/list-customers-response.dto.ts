import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class ListCustomersResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indica se há mais uma página a ser buscada',
  })
  hasMore: boolean;

  @ApiProperty({
    example: 100,
    description: 'Quantidade total de itens para os filtros informados',
  })
  totalCount: number;

  @ApiProperty({ example: 10, description: 'Quantidade de objetos por página' })
  limit: number;

  @ApiProperty({
    example: 0,
    description:
      'Posição do objeto a partir do qual a página deve ser carregada',
  })
  offset: number;

  @ApiProperty({ type: [CreateCustomerDto], description: 'Lista de objetos' })
  data: CreateCustomerDto[];
}
