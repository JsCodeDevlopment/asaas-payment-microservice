import { Injectable } from '@nestjs/common';
import { AsaasService } from '../asaas/asaas.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly asaas: AsaasService) {}

  create(dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.asaas.request<CustomerResponseDto>('post', '/customers', dto);
  }
}
