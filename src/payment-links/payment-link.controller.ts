import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
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
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLinkResponseDto } from './dto/payment-link-response.dto';
import { PaymentLinksService } from './payment-links.service';

@ApiTags('payment-links')
@Controller('payment-links')
export class PaymentLinksController {
  constructor(private readonly svc: PaymentLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um link de pagamento' })
  @ApiResponse({
    status: 201,
    description: 'Link de pagamento criado com sucesso',
    type: PaymentLinkResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Campos obrigatórios ausentes ou inválidos',
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
  create(
    @Body() dto: CreatePaymentLinkDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<PaymentLinkResponseDto> {
    return this.svc.create(dto, token, environment);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os links' })
  @ApiResponse({
    status: 200,
    description: 'Links de pagamento listados com sucesso',
    type: [PaymentLinkResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
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
  findAll(
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<PaymentLinkResponseDto[]> {
    return this.svc.findAll(token, environment);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalha um link específico' })
  @ApiResponse({
    status: 200,
    description: 'Link de pagamento encontrado com sucesso',
    type: PaymentLinkResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Link de pagamento não encontrado',
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
  findOne(
    @Param('id') id: string,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<PaymentLinkResponseDto> {
    return this.svc.findOne(id, token, environment);
  }
}
