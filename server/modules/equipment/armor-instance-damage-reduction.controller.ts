import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorInstanceDamageReductionService } from './armor-instance-damage-reduction.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorInstanceDamageReduction } from '../../entities/armor-instance-damage-reduction.entity.js';

@ApiTags('armor-instance-damage-reductions')
@Controller('armor-instance-damage-reductions')
export class ArmorInstanceDamageReductionController extends BaseCrudController<ArmorInstanceDamageReduction> {
  constructor(service: ArmorInstanceDamageReductionService) {
    super(service);
  }
}
