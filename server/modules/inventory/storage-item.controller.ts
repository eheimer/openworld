import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StorageItemService } from './storage-item.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { StorageItem } from '../../entities/storage-item.entity.js';

@ApiTags('storage-items')
@Controller('storage-items')
export class StorageItemController extends BaseCrudController<StorageItem> {
  constructor(service: StorageItemService) {
    super(service);
  }
}
