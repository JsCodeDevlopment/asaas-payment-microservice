import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { corsOptions } from 'src/config/cors.config';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setupSwagger(app);

  app.enableCors(corsOptions);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
