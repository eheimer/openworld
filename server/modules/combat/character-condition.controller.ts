import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacterConditionService } from './character-condition.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { CharacterCondition } from '../../entities/character-condition.entity.js';

@ApiTags('character-conditions')
@Controller('character-conditions')
export class CharacterConditionController extends BaseCrudController<CharacterCondition> {
  constructor(service: CharacterConditionService) {
    super(service);
  }
}
