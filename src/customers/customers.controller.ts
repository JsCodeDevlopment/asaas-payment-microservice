import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListCustomersResponseDto } from 'src/customers/dto/list-customers-response.dto';
import { FilterCustomerDto } from 'src/customers/types/get-customers-filters.type';
import { ErrorResponseDto } from 'src/types/dto/error-response.dto';
import { EnvironmentOptionsType } from 'src/types/environment.enum';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly svc: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso',
    type: CustomerResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: ErrorResponseDto,
  })
  @ApiHeader({
    name: 'access_token',
    description: 'API Key do Asaas para autenticação',
    required: true,
  })
  @ApiQuery({
    name: 'environment',
    enum: ['SANDBOX', 'PROD'],
    description: 'Escolhe o ambiente Asaas (SANDBOX ou PROD)',
    required: false,
    example: 'SANDBOX',
  })
  create(
    @Body() dto: CreateCustomerDto,
    @Headers('access_token') token: string,
    @Query('environment') environment: EnvironmentOptionsType,
  ): Promise<CustomerResponseDto | ErrorResponseDto> {
    return this.svc.create(dto, token, environment);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista clientes com filtro opcional de nome ou CPF/CNPJ',
    description:
      'Retorna todos os clientes, podendo filtrar por nome ou CPF/CNPJ.',
  })
  @ApiHeader({
    name: 'access_token',
    description: 'API Key do Asaas para autenticação',
    required: true,
  })
  @ApiQuery({
    name: 'environment',
    enum: ['SANDBOX', 'PROD'],
    description: 'Escolhe o ambiente Asaas (SANDBOX ou PROD)',
    required: false,
    example: 'SANDBOX',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Nome do cliente',
    type: String,
  })
  @ApiQuery({
    name: 'cpfCnpj',
    required: false,
    description: 'CPF ou CNPJ do cliente',
    type: String,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de registros a pular (paginação). Valor padrão: 0',
    type: Number,
    example: 0,
    schema: { default: 0 },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description:
      'Quantidade máxima de registros a retornar (máximo: 100, padrão: 10)',
    type: Number,
    example: 10,
    schema: { default: 10, maximum: 100 },
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso',
    type: ListCustomersResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: ErrorResponseDto,
  })
  findAll(
    @Query() filters: FilterCustomerDto,
    @Headers('access_token') token: string,
    @Query('environment') environment?: EnvironmentOptionsType,
  ): Promise<ListCustomersResponseDto | ErrorResponseDto> {
    return this.svc.getAll(token, filters, environment);
  }
}
