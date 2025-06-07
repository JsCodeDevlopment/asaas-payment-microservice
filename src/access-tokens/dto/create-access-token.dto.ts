import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  description?: string;
}
