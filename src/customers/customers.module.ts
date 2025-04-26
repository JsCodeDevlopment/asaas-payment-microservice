import { Module } from '@nestjs/common';
import { AsaasModule } from 'src/asaas/asaas.module';
import { CustomersController } from 'src/customers/customers.controller';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [AsaasModule],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
