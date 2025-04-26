import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @ApiProperty({ enum: ['EMAIL', 'SMS', 'WHATSAPP', 'VOICE'] })
  media: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'VOICE';

  @ApiProperty({ default: true })
  enabled: boolean;
}
