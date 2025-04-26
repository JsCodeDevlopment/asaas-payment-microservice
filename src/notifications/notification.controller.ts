import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get('customer/:id')
  @ApiOperation({ summary: 'Lista notificações de um cliente' })
  getByCustomer(@Param('id') id: string): Promise<NotificationResponseDto[]> {
    return this.svc.getByCustomer(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma notificação' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNotificationDto,
  ): Promise<NotificationResponseDto> {
    return this.svc.update(id, dto);
  }

  @Put('batch')
  @ApiOperation({ summary: 'Atualiza notificações em lote' })
  updateBatch(
    @Body() dto: UpdateNotificationDto[],
  ): Promise<NotificationResponseDto[]> {
    return this.svc.updateBatch(dto);
  }
}
