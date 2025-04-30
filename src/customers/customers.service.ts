import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ListCustomersResponseDto } from 'src/customers/dto/list-customers-response.dto';
import { FilterCustomerDto } from 'src/customers/types/get-customers-filters.type';
import { formatError } from 'src/helpers/format-error.helper';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { ErrorResponse } from 'src/types/error-response.type';
import { RequestMethodsEnum } from 'src/types/request-methods.enum';
import { AsaasService } from '../asaas/asaas.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly asaas: AsaasService) {}

  async create(
    dto: CreateCustomerDto,
    token: string,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<CustomerResponseDto | ErrorResponse> {
    try {
      return await this.asaas.request<CustomerResponseDto, CreateCustomerDto>(
        RequestMethodsEnum.POST,
        '/customers',
        dto,
        token,
        environment,
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      return formatError(axiosError);
    }
  }

  async getAll(
    token: string,
    filters?: FilterCustomerDto,
    environment: EnvironmentOptionsType = 'PROD',
  ): Promise<ListCustomersResponseDto | ErrorResponse> {
    try {
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
      return await this.asaas.request<ListCustomersResponseDto>(
        RequestMethodsEnum.GET,
        path,
        undefined,
        token,
        environment,
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      return formatError(axiosError);
    }
  }
}
