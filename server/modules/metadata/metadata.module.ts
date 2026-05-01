import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service.js';
import { MetadataController } from './metadata.controller.js';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService],
  exports: [MetadataService],
})
export class MetadataModule {}
