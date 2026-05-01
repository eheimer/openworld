import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MonsterService } from './monster.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Monster } from '../../entities/monster.entity.js';

@ApiTags('monsters')
@Controller('monsters')
export class MonsterController extends BaseCrudController<Monster> {
  constructor(service: MonsterService) {
    super(service);
  }
}
