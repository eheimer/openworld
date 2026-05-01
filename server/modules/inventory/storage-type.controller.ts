import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StorageTypeService } from './storage-type.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { StorageType } from '../../entities/storage-type.entity.js';

@ApiTags('storage-types')
@Controller('storage-types')
export class StorageTypeController extends BaseCrudController<StorageType> {
  constructor(service: StorageTypeService) {
    super(service);
  }
}
