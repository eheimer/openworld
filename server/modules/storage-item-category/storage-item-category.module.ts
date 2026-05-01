import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageItemCategory } from '../../entities/storage-item-category.entity.js';
import { StorageItemCategoryService } from './storage-item-category.service.js';
import { StorageItemCategoryController } from './storage-item-category.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([StorageItemCategory])],
  providers: [StorageItemCategoryService],
  controllers: [StorageItemCategoryController],
  exports: [StorageItemCategoryService],
})
export class StorageItemCategoryModule {}
