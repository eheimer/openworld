import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MonsterConditionService } from './monster-condition.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { MonsterCondition } from '../../entities/monster-condition.entity.js';

@ApiTags('monster-conditions')
@Controller('monster-conditions')
export class MonsterConditionController extends BaseCrudController<MonsterCondition> {
  constructor(service: MonsterConditionService) {
    super(service);
  }
}
