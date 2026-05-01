import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LootTableService } from './loot-table.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { LootTable } from '../../entities/loot-table.entity.js';

@ApiTags('loot-tables')
@Controller('loot-tables')
export class LootTableController extends BaseCrudController<LootTable> {
  constructor(service: LootTableService) {
    super(service);
  }
}
