import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConditionService } from './condition.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Condition } from '../../entities/condition.entity.js';

@ApiTags('conditions')
@Controller('conditions')
export class ConditionController extends BaseCrudController<Condition> {
  constructor(service: ConditionService) {
    super(service);
  }
}
