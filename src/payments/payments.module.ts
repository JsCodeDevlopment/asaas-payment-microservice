import { Module } from '@nestjs/common';
import { PaymentsController } from 'src/payments/payment.controller';
import { PaymentsService } from 'src/payments/payment.service';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
