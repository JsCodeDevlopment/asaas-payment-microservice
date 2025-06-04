import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { EncryptionService } from './services/encryption.service';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, EncryptionService],
  exports: [PaymentsService, EncryptionService],
})
export class PaymentsModule {}
