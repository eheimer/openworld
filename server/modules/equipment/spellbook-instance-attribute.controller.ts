import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpellbookInstanceAttributeService } from './spellbook-instance-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { SpellbookInstanceAttribute } from '../../entities/spellbook-instance-attribute.entity.js';

@ApiTags('spellbook-instance-attributes')
@Controller('spellbook-instance-attributes')
export class SpellbookInstanceAttributeController extends BaseCrudController<SpellbookInstanceAttribute> {
  constructor(service: SpellbookInstanceAttributeService) {
    super(service);
  }
}
