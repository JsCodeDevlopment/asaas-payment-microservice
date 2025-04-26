import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customer: string;

  @ApiProperty()
  event: string;

  @ApiProperty()
  media: string;

  @ApiProperty()
  enabled: boolean;
}
