import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EnvironmentOptionsType } from '../types/environment.enum';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookPayloadDto } from './dto/webhook-payload.dto';
import { WebhookService } from './webhook.service';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo webhook' })
  @ApiResponse({
    status: 201,
    description: 'Webhook criado com sucesso.',
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
  async createWebhook(
    @Body() dto: CreateWebhookDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ) {
    return this.webhookService.createWebhook(dto, token, environment);
  }

  @Post('asaas')
  @ApiOperation({ summary: 'Endpoint para receber notificações do Asaas' })
  @ApiResponse({
    status: 200,
    description: 'Webhook processado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Token de autenticação inválido.',
  })
  async handleWebhook(
    @Body() payload: WebhookPayloadDto,
    @Headers('asaas-webhook-token') authToken: string,
  ) {
    if (!authToken) {
      throw new UnauthorizedException(
        'Webhook authentication token is required',
      );
    }

    return this.webhookService.handleWebhookEvent(payload, authToken);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os eventos de webhook' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos retornada com sucesso.',
  })
  async findAllWebhookEvents() {
    return this.webhookService.findAllWebhookEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um evento de webhook específico' })
  @ApiResponse({
    status: 200,
    description: 'Evento retornado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  async findWebhookEventById(@Param('id') id: string) {
    return this.webhookService.findWebhookEventById(id);
  }
}
