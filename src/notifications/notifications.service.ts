import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { formatError } from 'src/helpers/format-error.helper';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly asaas: AsaasService) {}

  async getByCustomer(
    customerId: string,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<NotificationResponseDto[]> {
    try {
      return await this.asaas.request<NotificationResponseDto[]>(
        RequestMethodsEnum.GET,
        `/customers/${customerId}/notifications`,
        undefined,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async update(
    id: string,
    dto: UpdateNotificationDto,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<NotificationResponseDto> {
    try {
      return await this.asaas.request<
        NotificationResponseDto,
        UpdateNotificationDto
      >(
        RequestMethodsEnum.PUT,
        `/notifications/${id}`,
        dto,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async updateBatch(
    dtos: UpdateNotificationDto[],
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<NotificationResponseDto[]> {
    try {
      return await this.asaas.request<
        NotificationResponseDto[],
        UpdateNotificationDto[]
      >(
        RequestMethodsEnum.PUT,
        '/notifications/batch',
        dtos,
        token,
        environment,
      );
    } catch (error) {
      formatError(error as AxiosError);
    }
  }
}
