import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Inventory } from '../../entities/inventory.entity.js';

@ApiTags('inventories')
@Controller('inventories')
export class InventoryController extends BaseCrudController<Inventory> {
  constructor(service: InventoryService) {
    super(service);
  }
}
