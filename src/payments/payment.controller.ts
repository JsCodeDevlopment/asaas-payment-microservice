import {
  Body,
  Controller,
  Delete,
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
import { ListPaymentsResponseDto } from 'src/payments/dto/list-payments-response.dto';
import { PaymentsService } from 'src/payments/payment.service';
import { ErrorResponseDto } from 'src/types/dto/error-response.dto';
import { SuccessResponseDto } from 'src/types/dto/success-response.dto';
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
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O campo billingType é obrigatório.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O campo value é obrigatório.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O campo dueDate é obrigatório.',
    type: ErrorResponseDto,
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
    @Body() dto: CreatePaymentDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<PaymentResponseDto | ErrorResponseDto> {
    return this.svc.create(dto, token, environment);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as cobranças' })
  @ApiResponse({
    status: 200,
    description: 'Parcelas listadas com sucesso.',
    type: ListPaymentsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Plano não encontrado.',
    type: ErrorResponseDto,
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
  @ApiQuery({
    name: 'installment',
    type: String,
    required: false,
    description: 'Filtrar pelo Identificador único do parcelamento',
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Elemento inicial da lista',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Número de elementos da lista (max: 100)',
    maximum: 100,
  })
  @ApiQuery({
    name: 'customerId',
    type: String,
    required: false,
    description: 'Filtrar pelo Identificador único do cliente',
  })
  findAll(
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
    @Query('installment') installment?: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
    @Query('customerId') customerId?: string,
  ): Promise<ListPaymentsResponseDto | ErrorResponseDto> {
    return this.svc.findAllPayments(token, environment, {
      installment,
      offset,
      limit,
      customerId,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma cobrança' })
  @ApiResponse({
    status: 200,
    description: 'Cobrança deletada com sucesso.',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O campo id é obrigatório.',
    type: ErrorResponseDto,
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
  delete(
    @Param('id') id: string,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<SuccessResponseDto | ErrorResponseDto> {
    return this.svc.deletePayment(id, token, environment);
  }
}
