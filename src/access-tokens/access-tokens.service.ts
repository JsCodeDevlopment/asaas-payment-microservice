import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { formatError } from 'src/helpers/format-error.helper';
import { Repository } from 'typeorm';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';
import { AccessToken } from './entities/access-token.entity';

@Injectable()
export class AccessTokensService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
  ) {}

  async create(
    createAccessTokenDto: CreateAccessTokenDto,
  ): Promise<AccessToken> {
    const existingToken = await this.accessTokenRepository.findOne({
      where: { clientId: createAccessTokenDto.clientId },
    });

    if (existingToken) {
      throw new ConflictException('Client ID already exists');
    }

    const accessToken = this.accessTokenRepository.create(createAccessTokenDto);
    return this.accessTokenRepository.save(accessToken);
  }

  async findAll(): Promise<AccessToken[]> {
    try {
      const tokens = await this.accessTokenRepository.find();
      return tokens;
    } catch (error) {
      formatError(error as AxiosError);
    }
  }

  async findOne(id: string): Promise<AccessToken> {
    const accessToken = await this.accessTokenRepository.findOne({
      where: { id },
    });

    if (!accessToken) {
      throw new NotFoundException(`Access token with ID ${id} not found`);
    }

    return accessToken;
  }

  async findByClientId(clientId: string): Promise<AccessToken> {
    const accessToken = await this.accessTokenRepository.findOne({
      where: { clientId, isActive: true },
    });

    if (!accessToken) {
      throw new NotFoundException(
        `Active access token for client ${clientId} not found`,
      );
    }

    return accessToken;
  }

  async update(
    id: string,
    updateAccessTokenDto: UpdateAccessTokenDto,
  ): Promise<AccessToken> {
    const accessToken = await this.findOne(id);

    if (
      updateAccessTokenDto.clientId &&
      updateAccessTokenDto.clientId !== accessToken.clientId
    ) {
      const existingToken = await this.accessTokenRepository.findOne({
        where: { clientId: updateAccessTokenDto.clientId },
      });

      if (existingToken) {
        throw new ConflictException('Client ID already exists');
      }
    }

    Object.assign(accessToken, updateAccessTokenDto);
    return this.accessTokenRepository.save(accessToken);
  }

  async remove(id: string): Promise<void> {
    const accessToken = await this.findOne(id);
    await this.accessTokenRepository.remove(accessToken);
  }

  async deactivate(id: string): Promise<AccessToken> {
    const accessToken = await this.findOne(id);
    accessToken.isActive = false;
    return this.accessTokenRepository.save(accessToken);
  }

  async activate(id: string): Promise<AccessToken> {
    const accessToken = await this.findOne(id);
    accessToken.isActive = true;
    return this.accessTokenRepository.save(accessToken);
  }
}
