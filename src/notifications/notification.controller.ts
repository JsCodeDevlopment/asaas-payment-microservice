import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get('customer/:id')
  @ApiOperation({ summary: 'Lista notificações de um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Notificações listadas com sucesso',
    type: [NotificationResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado',
  })
  @ApiHeader({
    name: 'access_token',
    description: 'API Key do Asaas para autenticação',
    required: true,
  })
  @ApiQuery({
    name: 'environment',
    enum: ['SANDBOX', 'PROD'],
    description: 'Escolhe o ambiente Asaas (SANDBOX ou PROD)',
    required: false,
    example: 'SANDBOX',
  })
  getByCustomer(
    @Param('id') id: string,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<NotificationResponseDto[]> {
    return this.svc.getByCustomer(id, token, environment);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma notificação' })
  @ApiResponse({
    status: 200,
    description: 'Notificação atualizada com sucesso',
    type: NotificationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Notificação não encontrada',
  })
  @ApiHeader({
    name: 'access_token',
    description: 'API Key do Asaas para autenticação',
    required: true,
  })
  @ApiQuery({
    name: 'environment',
    enum: ['SANDBOX', 'PROD'],
    description: 'Escolhe o ambiente Asaas (SANDBOX ou PROD)',
    required: false,
    example: 'SANDBOX',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNotificationDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<NotificationResponseDto> {
    return this.svc.update(id, dto, token, environment);
  }

  @Put('batch')
  @ApiOperation({ summary: 'Atualiza notificações em lote' })
  @ApiResponse({
    status: 200,
    description: 'Notificações atualizadas com sucesso',
    type: [NotificationResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para atualização',
  })
  @ApiHeader({
    name: 'access_token',
    description: 'API Key do Asaas para autenticação',
    required: true,
  })
  @ApiQuery({
    name: 'environment',
    enum: ['SANDBOX', 'PROD'],
    description: 'Escolhe o ambiente Asaas (SANDBOX ou PROD)',
    required: false,
    example: 'SANDBOX',
  })
  updateBatch(
    @Body() dto: UpdateNotificationDto[],
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<NotificationResponseDto[]> {
    return this.svc.updateBatch(dto, token, environment);
  }
}
