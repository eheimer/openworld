import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StorageItemCategoryService } from './storage-item-category.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { StorageItemCategory } from '../../entities/storage-item-category.entity.js';

@ApiTags('storage-item-categories')
@Controller('storage-item-categories')
export class StorageItemCategoryController extends BaseCrudController<StorageItemCategory> {
  constructor(service: StorageItemCategoryService) {
    super(service);
  }
}
