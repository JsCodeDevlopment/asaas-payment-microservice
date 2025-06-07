import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokensController } from './access-tokens.controller';
import { AccessTokensService } from './access-tokens.service';
import { AccessToken } from './entities/access-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken])],
  controllers: [AccessTokensController],
  providers: [AccessTokensService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
