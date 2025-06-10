import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('admin')
export class AdminController {
  private readonly adminPassword: string;

  constructor(private configService: ConfigService) {
    const password = this.configService.get<string>('ADMIN_PASSWORD');
    if (!password) {
      throw new Error('ADMIN_PASSWORD environment variable is required');
    }
    this.adminPassword = password;
  }

  @Get()
  serveAdminInterface(@Res() res: Response): void {
    try {
      const adminHtmlPath = join(
        process.cwd(),
        'public',
        'admin',
        'index.html',
      );
      let html = readFileSync(adminHtmlPath, 'utf8');

      // Replace the placeholder with the actual admin password
      html = html.replace('{{ADMIN_PASSWORD}}', this.adminPassword);

      res.send(html);
    } catch {
      res.status(500).send('Erro ao carregar interface administrativa');
    }
  }
}
