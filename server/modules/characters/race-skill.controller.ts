import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RaceSkillService } from './race-skill.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RaceSkill } from '../../entities/race-skill.entity.js';

@ApiTags('race-skills')
@Controller('race-skills')
export class RaceSkillController extends BaseCrudController<RaceSkill> {
  constructor(service: RaceSkillService) {
    super(service);
  }
}
