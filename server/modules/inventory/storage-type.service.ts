import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageType } from '../../entities/storage-type.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class StorageTypeService extends BaseCrudService<StorageType> {
  constructor(
    @InjectRepository(StorageType)
    repository: Repository<StorageType>,
  ) {
    super(repository, []);
  }
}
