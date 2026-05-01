import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpellbookInstanceService } from './spellbook-instance.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { SpellbookInstance } from '../../entities/spellbook-instance.entity.js';

@ApiTags('spellbook-instances')
@Controller('spellbook-instances')
export class SpellbookInstanceController extends BaseCrudController<SpellbookInstance> {
  constructor(service: SpellbookInstanceService) {
    super(service);
  }
}
