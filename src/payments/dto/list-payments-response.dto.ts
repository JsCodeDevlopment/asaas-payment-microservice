import { ApiProperty } from '@nestjs/swagger';
import { PaymentResponseDto } from 'src/payments/dto/payment-response.dto';

export class ListPaymentsResponseDto {
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

  @ApiProperty({ type: [PaymentResponseDto], description: 'Lista de objetos' })
  data: PaymentResponseDto[];
}
