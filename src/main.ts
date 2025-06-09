import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setupCors } from 'src/config/cors.config';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Adiciona o prefixo global /api para todas as rotas
  app.setGlobalPrefix('api');

  setupSwagger(app);
  setupCors(app);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}
    Access the API at http://localhost:${port}
    `);
}
bootstrap();
