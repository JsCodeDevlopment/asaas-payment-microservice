import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setupSwagger(app);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
