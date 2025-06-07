import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';
import { AccessToken } from './entities/access-token.entity';

@Controller('access-tokens')
export class AccessTokensController {
  constructor(private readonly accessTokensService: AccessTokensService) {}

  @Post()
  create(
    @Body() createAccessTokenDto: CreateAccessTokenDto,
  ): Promise<AccessToken> {
    return this.accessTokensService.create(createAccessTokenDto);
  }

  @Get()
  findAll(): Promise<AccessToken[]> {
    return this.accessTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AccessToken> {
    return this.accessTokensService.findOne(id);
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string): Promise<AccessToken> {
    return this.accessTokensService.findByClientId(clientId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccessTokenDto: UpdateAccessTokenDto,
  ): Promise<AccessToken> {
    return this.accessTokensService.update(id, updateAccessTokenDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.accessTokensService.remove(id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string): Promise<AccessToken> {
    return this.accessTokensService.deactivate(id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string): Promise<AccessToken> {
    return this.accessTokensService.activate(id);
  }
}
