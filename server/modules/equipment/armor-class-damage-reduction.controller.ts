import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorClassDamageReductionService } from './armor-class-damage-reduction.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorClassDamageReduction } from '../../entities/armor-class-damage-reduction.entity.js';

@ApiTags('armor-class-damage-reductions')
@Controller('armor-class-damage-reductions')
export class ArmorClassDamageReductionController extends BaseCrudController<ArmorClassDamageReduction> {
  constructor(service: ArmorClassDamageReductionService) {
    super(service);
  }
}
