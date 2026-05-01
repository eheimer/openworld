import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GemRarityService } from './gem-rarity.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { GemRarity } from '../../entities/gem-rarity.entity.js';

@ApiTags('gem-rarities')
@Controller('gem-rarities')
export class GemRarityController extends BaseCrudController<GemRarity> {
  constructor(service: GemRarityService) {
    super(service);
  }
}
