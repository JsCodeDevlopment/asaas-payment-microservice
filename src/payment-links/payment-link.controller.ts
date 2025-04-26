import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLinkResponseDto } from './dto/payment-link-response.dto';
import { PaymentLinksService } from './payment-links.service';

@ApiTags('payment-links')
@Controller('payment-links')
export class PaymentLinksController {
  constructor(private readonly svc: PaymentLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um link de pagamento' })
  create(@Body() dto: CreatePaymentLinkDto): Promise<PaymentLinkResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os links' })
  findAll(): Promise<PaymentLinkResponseDto[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalha um link específico' })
  findOne(@Param('id') id: string): Promise<PaymentLinkResponseDto> {
    return this.svc.findOne(id);
  }
}
