import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageItemCategory } from '../../entities/storage-item-category.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class StorageItemCategoryService extends BaseCrudService<StorageItemCategory> {
  constructor(
    @InjectRepository(StorageItemCategory)
    repository: Repository<StorageItemCategory>,
  ) {
    super(repository, ['storageType', 'reloadFamily']);
  }
}
