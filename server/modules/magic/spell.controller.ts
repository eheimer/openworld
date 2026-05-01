import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpellService } from './spell.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Spell } from '../../entities/spell.entity.js';

@ApiTags('spells')
@Controller('spells')
export class SpellController extends BaseCrudController<Spell> {
  constructor(service: SpellService) {
    super(service);
  }
}
