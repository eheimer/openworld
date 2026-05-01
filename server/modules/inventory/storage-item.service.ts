import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageItem } from '../../entities/storage-item.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class StorageItemService extends BaseCrudService<StorageItem> {
  constructor(
    @InjectRepository(StorageItem)
    repository: Repository<StorageItem>,
  ) {
    super(repository, ['category']);
  }
}
