import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BattleService } from './battle.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Battle } from '../../entities/battle.entity.js';

@ApiTags('battles')
@Controller('battles')
export class BattleController extends BaseCrudController<Battle> {
  constructor(service: BattleService) {
    super(service);
  }
}
