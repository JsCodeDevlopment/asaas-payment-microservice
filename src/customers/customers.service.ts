import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ListCustomersResponseDto } from 'src/customers/dto/list-customers-response.dto';
import { FilterCustomerDto } from 'src/customers/types/get-customers-filters.type';
import { formatError } from 'src/helpers/format-error.helper';
import { ErrorResponseDto } from 'src/types/dto/error-response.dto';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
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
  ): Promise<CustomerResponseDto | ErrorResponseDto> {
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
  ): Promise<ListCustomersResponseDto | ErrorResponseDto> {
    try {
      return await this.asaas.request<ListCustomersResponseDto>(
        RequestMethodsEnum.GET,
        '/customers',
        undefined,
        token,
        environment,
        filters,
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      return formatError(axiosError);
    }
  }
}
