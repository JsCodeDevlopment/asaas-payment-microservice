import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AdminController],
})
export class AdminModule {}
