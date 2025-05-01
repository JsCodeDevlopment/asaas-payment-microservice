import { ApiProperty } from '@nestjs/swagger';

export class PixInfoResponseDto {
  @ApiProperty({ description: 'Imagem do QrCode em base64' })
  encodedImage: string;

  @ApiProperty({ description: 'Copia e Cola do QrCode' })
  payload: string;

  @ApiProperty({
    description: 'Data de expiração do QrCode',
    type: String,
    format: 'date-time',
  })
  expirationDate: string;
}
