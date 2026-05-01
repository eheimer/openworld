import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeaponSkillService } from './weapon-skill.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { WeaponSkill } from '../../entities/weapon-skill.entity.js';

@ApiTags('weapon-skills')
@Controller('weapon-skills')
export class WeaponSkillController extends BaseCrudController<WeaponSkill> {
  constructor(service: WeaponSkillService) {
    super(service);
  }
}
