import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageType } from '../../entities/storage-type.entity.js';
import { StorageTypeService } from './storage-type.service.js';
import { StorageTypeController } from './storage-type.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([StorageType])],
  providers: [StorageTypeService],
  controllers: [StorageTypeController],
  exports: [StorageTypeService],
})
export class StorageTypeModule {}
