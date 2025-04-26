import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from 'src/payments/payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly svc: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova cobrança' })
  create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.svc.create(dto);
  }

  @Get('installments/:id')
  @ApiOperation({ summary: 'Lista parcelas de um plano' })
  findInstallments(@Param('id') id: string) {
    return this.svc.findInstallments(id);
  }
}
