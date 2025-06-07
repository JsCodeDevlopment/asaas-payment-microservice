import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('asaas_access_tokens')
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
