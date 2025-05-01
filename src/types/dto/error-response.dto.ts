import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400, description: 'Código de erro HTTP.' })
  code: number;

  @ApiProperty({
    example: 'Mensagem de erro detalhada.',
    description: 'Descrição do erro.',
  })
  message: string;
}
