import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupCors(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const frontUrl = configService.get<string>('FRONTEND_URL');

  let whitelistUrls: string[] = [];

  if (frontUrl) {
    whitelistUrls =
      frontUrl
        .split(',')
        .map((url) => (url.endsWith('/') ? url.slice(0, -1) : url)) ?? [];
  }

  app.enableCors({
    origin: function (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) {
      const normalizedOrigin =
        origin && origin.endsWith('/') ? origin.slice(0, -1) : origin;

      if (!normalizedOrigin || whitelistUrls.indexOf(normalizedOrigin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'access_token'],
  });
}
