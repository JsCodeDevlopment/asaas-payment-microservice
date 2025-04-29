import { Injectable } from '@nestjs/common';
import { ListCustomersResponseDto } from 'src/customers/dto/list-customers-response.dto';
import { FilterCustomerDto } from 'src/customers/types/get-customers-filters.type';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly asaas: AsaasService) {}

  create(
    dto: CreateCustomerDto,
    token: string,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<CustomerResponseDto> {
    return this.asaas.request<CustomerResponseDto, CreateCustomerDto>(
      RequestMethodsEnum.POST,
      '/customers',
      dto,
      token,
      environment,
    );
  }

  async getAll(
    token: string,
    filters?: FilterCustomerDto,
    environment: EnvironmentOptionsType = 'SANDBOX',
  ): Promise<ListCustomersResponseDto> {
    const query = new URLSearchParams();

    if (filters) {
      const params: Record<string, string | number> = {
        ...(filters.name && { name: filters.name }),
        ...(filters.cpfCnpj && { cpfCnpj: filters.cpfCnpj }),
        limit:
          filters.limit !== undefined && filters.limit !== null
            ? filters.limit
            : 10,
        offset:
          filters.offset !== undefined && filters.offset !== null
            ? filters.offset
            : 0,
      };

      Object.entries(params).forEach(([key, value]) => {
        query.append(key, value.toString());
      });
    }

    const path = query.toString() ? `/customers?${query}` : '/customers';
    return this.asaas.request<ListCustomersResponseDto>(
      RequestMethodsEnum.GET,
      path,
      undefined,
      token,
      environment,
    );
  }
}
