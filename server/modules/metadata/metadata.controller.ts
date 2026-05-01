import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../guards/admin.guard.js';
import { MetadataService, TableMeta } from './metadata.service.js';

@ApiTags('metadata')
@Controller('metadata')
@UseGuards(AdminGuard)
export class MetadataController {
  constructor(private metadataService: MetadataService) {}

  @Get('tables')
  getTables(): TableMeta[] {
    return this.metadataService.getAll();
  }
}
