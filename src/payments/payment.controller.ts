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
import { PaymentsService } from 'src/payments/payment.service';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly svc: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova cobrança' })
  @ApiResponse({
    status: 201,
    description: 'Cobrança criada com sucesso.',
    type: PaymentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O campo customerId é obrigatório.',
  })
  @ApiResponse({
    status: 400,
    description: 'O campo billingType é obrigatório.',
  })
  @ApiResponse({ status: 400, description: 'O campo value é obrigatório.' })
  @ApiResponse({ status: 400, description: 'O campo dueDate é obrigatório.' })
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
    @Body() dto: CreatePaymentDto,
    @Headers('access_token') token: string,
    @Query('enviroment') environment: EnvironmentOptionsType,
  ): Promise<PaymentResponseDto> {
    return this.svc.create(dto, token, environment);
  }

  @Get('installments/:id')
  @ApiOperation({ summary: 'Lista parcelas de um plano' })
  @ApiResponse({ status: 200, description: 'Parcelas listadas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
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
  findInstallments(
    @Param('id') id: string,
    @Headers('access_token') token: string,
    @Query('enviroment') environment: EnvironmentOptionsType,
  ) {
    return this.svc.findInstallments(id, token, environment);
  }
}
