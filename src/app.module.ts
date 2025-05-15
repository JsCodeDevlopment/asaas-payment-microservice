import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import asaasConfig from './config/asaas.config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CustomersModule } from 'src/customers/customers.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PaymentLinksModule } from 'src/payment-links/payment-links.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { AsaasModule } from './asaas/asaas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [asaasConfig],
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api'],
    }),
    AsaasModule.registerAsync(),
    CustomersModule,
    PaymentsModule,
    PaymentLinksModule,
    NotificationsModule,
  ],
})
export class AppModule {}
