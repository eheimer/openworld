import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacterSkillService } from './character-skill.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { CharacterSkill } from '../../entities/character-skill.entity.js';

@ApiTags('character-skills')
@Controller('character-skills')
export class CharacterSkillController extends BaseCrudController<CharacterSkill> {
  constructor(service: CharacterSkillService) {
    super(service);
  }
}
