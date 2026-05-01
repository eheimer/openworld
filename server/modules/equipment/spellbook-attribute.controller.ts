import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpellbookAttributeService } from './spellbook-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { SpellbookAttribute } from '../../entities/spellbook-attribute.entity.js';

@ApiTags('spellbook-attributes')
@Controller('spellbook-attributes')
export class SpellbookAttributeController extends BaseCrudController<SpellbookAttribute> {
  constructor(service: SpellbookAttributeService) {
    super(service);
  }
}
