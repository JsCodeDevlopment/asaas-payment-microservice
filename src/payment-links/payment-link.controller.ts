import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/types/dto/error-response.dto';
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
    @Query('enviroment') environment: EnvironmentOptionsType,
  ): Promise<PaymentLinkResponseDto | ErrorResponseDto> {
    return this.svc.create(dto, token, environment);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os links' })
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
    @Query('enviroment') environment: EnvironmentOptionsType,
  ): Promise<PaymentLinkResponseDto[] | ErrorResponseDto> {
    return this.svc.findAll(token, environment);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalha um link específico' })
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
    @Query('enviroment') environment: EnvironmentOptionsType,
  ): Promise<PaymentLinkResponseDto | ErrorResponseDto> {
    return this.svc.findOne(id, token, environment);
  }
}
