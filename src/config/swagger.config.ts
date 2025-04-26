import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const title = process.env.SWAGGER_TITLE || 'Microserviço de Pagamentos Asaas';
  const description =
    process.env.SWAGGER_DESCRIPTION ||
    'Microserviço desenvolvido em NestJS que encapsula toda a integração com a API do Asaas.';
  const version = process.env.SWAGGER_VERSION || '1.0';
  const path = process.env.SWAGGER_PATH || 'api';

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document);
}
