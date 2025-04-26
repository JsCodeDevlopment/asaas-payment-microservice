import { ApiProperty } from '@nestjs/swagger';

export class PaymentLinkResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  status: string;
}
