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
import { CreateCreditCardPaymentDto } from 'src/payments/dto/create-credit-card-payment.dto';
import { CreditCardPaymentResponseDto } from 'src/payments/dto/credit-card-payment-response.dto';
import { ListPaymentsResponseDto } from 'src/payments/dto/list-payments-response.dto';
import { PixInfoResponseDto } from 'src/payments/dto/pix-info-response.dto';
import { PaymentsService } from 'src/payments/payment.service';
import { SuccessResponseDto } from 'src/types/dto/success-response.dto';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { EncryptedCreditCardPaymentDto } from './dto/encrypted-credit-card-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { EncryptionService } from './services/encryption.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly svc: PaymentsService,
    private readonly encryptionService: EncryptionService,
  ) {}

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
  @ApiResponse({
    status: 400,
    description: 'O campo value é obrigatório.',
  })
  @ApiResponse({
    status: 400,
    description: 'O campo dueDate é obrigatório.',
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
  ): Promise<PaymentResponseDto> {
    return this.svc.create(dto, token, environment);
  }

  @Post('credit-card')
  @ApiOperation({ summary: 'Cria uma nova cobrança via cartão de crédito' })
  @ApiResponse({
    status: 201,
    description: 'Cobrança criada com sucesso.',
    type: CreditCardPaymentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Campos obrigatórios ausentes ou inválidos.',
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
  createCreditCardPayment(
    @Body()
    dto: CreateCreditCardPaymentDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<CreditCardPaymentResponseDto> {
    return this.svc.createCreditCardPayment(dto, token, environment);
  }

  @Get(':id/pix-info')
  @ApiOperation({
    summary:
      'Obtém informações do PIX (QR Code e Copia e Cola) para uma cobrança',
  })
  @ApiResponse({
    status: 200,
    description: 'Informações do PIX retornadas com sucesso.',
    type: PixInfoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O campo id é obrigatório.',
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
  getPixInfo(
    @Param('id') id: string,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<PixInfoResponseDto> {
    return this.svc.getPixInfo(id, token, environment);
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
  ): Promise<ListPaymentsResponseDto> {
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
  ): Promise<SuccessResponseDto> {
    return this.svc.deletePayment(id, token, environment);
  }

  @Get('public-key')
  @ApiOperation({
    summary: 'Obtém a chave pública para criptografia dos dados do cartão',
  })
  @ApiResponse({
    status: 200,
    description: 'Chave pública retornada com sucesso.',
    type: String,
  })
  getPublicKey(): string {
    return this.encryptionService.getPublicKey();
  }

  @Post('secure/credit-card')
  @ApiOperation({
    summary:
      'Cria uma nova cobrança via cartão de crédito com dados criptografados',
  })
  @ApiResponse({
    status: 201,
    description: 'Cobrança criada com sucesso.',
    type: CreditCardPaymentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Campos obrigatórios ausentes ou inválidos.',
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
  createSecureCreditCardPayment(
    @Body() dto: EncryptedCreditCardPaymentDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<CreditCardPaymentResponseDto> {
    return this.svc.createSecureCreditCardPayment(dto, token, environment);
  }
}
