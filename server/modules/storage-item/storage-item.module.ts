import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageItem } from '../../entities/storage-item.entity.js';
import { StorageItemService } from './storage-item.service.js';
import { StorageItemController } from './storage-item.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([StorageItem])],
  providers: [StorageItemService],
  controllers: [StorageItemController],
  exports: [StorageItemService],
})
export class StorageItemModule {}
