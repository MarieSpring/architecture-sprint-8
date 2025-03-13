import { Controller, Get, UseGuards, StreamableFile } from '@nestjs/common';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('reports')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles({ roles: ['realm:prothetic_user'] })
  getReports(): StreamableFile {
    return new StreamableFile(Buffer.from('Report data'), {
      type: 'text/plain',
      disposition: 'attachment; filename="report.csv"',
    });
  }
}


