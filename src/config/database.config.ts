import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface DatabaseConfig {
  url: string;
  synchronize: boolean;
  logging: boolean;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/asaas_payment_gateway',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
  }),
);

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const url =
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/asaas_payment_gateway';

  return {
    type: 'postgres',
    url,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
  };
};
