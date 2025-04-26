import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from 'src/payments/payment.service';
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
  create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.svc.create(dto);
  }

  @Get('installments/:id')
  @ApiOperation({ summary: 'Lista parcelas de um plano' })
  @ApiResponse({ status: 200, description: 'Parcelas listadas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  findInstallments(@Param('id') id: string) {
    return this.svc.findInstallments(id);
  }
}
