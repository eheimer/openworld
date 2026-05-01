import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MonsterActionService } from './monster-action.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { MonsterAction } from '../../entities/monster-action.entity.js';

@ApiTags('monster-actions')
@Controller('monster-actions')
export class MonsterActionController extends BaseCrudController<MonsterAction> {
  constructor(service: MonsterActionService) {
    super(service);
  }
}
