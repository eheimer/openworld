import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunicAffixPoolEntryService } from './runic-affix-pool-entry.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RunicAffixPoolEntry } from '../../entities/runic-affix-pool-entry.entity.js';

@ApiTags('runic-affix-pool-entries')
@Controller('runic-affix-pool-entries')
export class RunicAffixPoolEntryController extends BaseCrudController<RunicAffixPoolEntry> {
  constructor(service: RunicAffixPoolEntryService) {
    super(service);
  }
}
