import { Injectable } from '@nestjs/common';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly asaas: AsaasService) {}

  getByCustomer(
    customerId: string,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<NotificationResponseDto[]> {
    return this.asaas.request<NotificationResponseDto[]>(
      RequestMethodsEnum.GET,
      `/customers/${customerId}/notifications`,
      undefined,
      token,
      environment,
    );
  }

  update(
    id: string,
    dto: UpdateNotificationDto,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<NotificationResponseDto> {
    return this.asaas.request<NotificationResponseDto, UpdateNotificationDto>(
      RequestMethodsEnum.PUT,
      `/notifications/${id}`,
      dto,
      token,
      environment,
    );
  }

  updateBatch(
    dtos: UpdateNotificationDto[],
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<NotificationResponseDto[]> {
    return this.asaas.request<
      NotificationResponseDto[],
      UpdateNotificationDto[]
    >(RequestMethodsEnum.PUT, '/notifications/batch', dtos, token, environment);
  }
}
