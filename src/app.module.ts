import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccessTokensModule } from 'src/access-tokens/access-tokens.module';
import { AsaasModule } from 'src/asaas/asaas.module';
import asaasConfig from 'src/config/asaas.config';
import databaseConfig, { getTypeOrmConfig } from 'src/config/database.config';
import { CustomersModule } from 'src/customers/customers.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PaymentLinksModule } from 'src/payment-links/payment-links.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [asaasConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => getTypeOrmConfig(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api'],
    }),
    AsaasModule.registerAsync(),
    AccessTokensModule,
    CustomersModule,
    PaymentsModule,
    PaymentLinksModule,
    NotificationsModule,
  ],
})
export class AppModule {}
