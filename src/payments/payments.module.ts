import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsaasModule } from 'src/asaas/asaas.module';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { EncryptionService } from './services/encryption.service';
import { PaymentValidationService } from './services/payment-validation.service';

@Module({
  imports: [ConfigModule, AsaasModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, EncryptionService, PaymentValidationService],
  exports: [PaymentsService, EncryptionService, PaymentValidationService],
})
export class PaymentsModule {}
