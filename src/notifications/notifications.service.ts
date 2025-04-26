import { Injectable } from '@nestjs/common';
import { AsaasService } from '../asaas/asaas.service';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly asaas: AsaasService) {}

  getByCustomer(customerId: string): Promise<NotificationResponseDto[]> {
    return this.asaas.request<NotificationResponseDto[]>(
      'get',
      `/customers/${customerId}/notifications`,
    );
  }

  update(
    id: string,
    dto: UpdateNotificationDto,
  ): Promise<NotificationResponseDto> {
    return this.asaas.request<NotificationResponseDto>(
      'put',
      `/notifications/${id}`,
      dto,
    );
  }

  updateBatch(
    dtos: UpdateNotificationDto[],
  ): Promise<NotificationResponseDto[]> {
    return this.asaas.request<NotificationResponseDto[]>(
      'put',
      '/notifications/batch',
      dtos,
    );
  }
}
