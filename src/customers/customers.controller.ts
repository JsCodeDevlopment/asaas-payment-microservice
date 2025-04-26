import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCustomersResponseDto } from 'src/customers/dto/list-customers-response.dto';
import { FilterCustomerDto } from 'src/customers/types/get-customers-filters.type';
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
  })
  create(@Body() dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista clientes com filtro opcional de nome ou CPF/CNPJ',
    description:
      'Retorna todos os clientes, podendo filtrar por nome ou CPF/CNPJ.',
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
  })
  findAll(
    @Query() filters: FilterCustomerDto,
  ): Promise<ListCustomersResponseDto> {
    return this.svc.getAll(filters);
  }
}
