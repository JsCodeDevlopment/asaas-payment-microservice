import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAccessTokenDto {
  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
