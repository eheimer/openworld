import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PoisonTierService } from './poison-tier.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { PoisonTier } from '../../entities/poison-tier.entity.js';

@ApiTags('poison-tiers')
@Controller('poison-tiers')
export class PoisonTierController extends BaseCrudController<PoisonTier> {
  constructor(service: PoisonTierService) {
    super(service);
  }
}
