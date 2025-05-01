import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({ example: 200, description: 'Código de status da resposta' })
  code: number;

  @ApiProperty({
    example: 'Operação realizada com sucesso',
    description: 'Mensagem de sucesso',
  })
  message: string;
}
