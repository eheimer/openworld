import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunicAffixPoolService } from './runic-affix-pool.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RunicAffixPool } from '../../entities/runic-affix-pool.entity.js';

@ApiTags('runic-affix-pools')
@Controller('runic-affix-pools')
export class RunicAffixPoolController extends BaseCrudController<RunicAffixPool> {
  constructor(service: RunicAffixPoolService) {
    super(service);
  }
}
