import { Module } from '@nestjs/common';
import { PaymentLinksController } from 'src/payment-links/payment-link.controller';
import { PaymentLinksService } from 'src/payment-links/payment-links.service';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  providers: [PaymentLinksService],
  controllers: [PaymentLinksController],
})
export class PaymentLinksModule {}
