import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MonsterInstanceService } from './monster-instance.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { MonsterInstance } from '../../entities/monster-instance.entity.js';

@ApiTags('monster-instances')
@Controller('monster-instances')
export class MonsterInstanceController extends BaseCrudController<MonsterInstance> {
  constructor(service: MonsterInstanceService) {
    super(service);
  }
}
