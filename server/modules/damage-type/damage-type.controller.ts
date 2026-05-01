import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DamageTypeService } from './damage-type.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { DamageType } from '../../entities/damage-type.entity.js';

@ApiTags('damage-types')
@Controller('damage-types')
export class DamageTypeController extends BaseCrudController<DamageType> {
  constructor(service: DamageTypeService) {
    super(service);
  }
}
