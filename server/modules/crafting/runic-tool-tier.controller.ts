import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunicToolTierService } from './runic-tool-tier.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RunicToolTier } from '../../entities/runic-tool-tier.entity.js';

@ApiTags('runic-tool-tiers')
@Controller('runic-tool-tiers')
export class RunicToolTierController extends BaseCrudController<RunicToolTier> {
  constructor(service: RunicToolTierService) {
    super(service);
  }
}
