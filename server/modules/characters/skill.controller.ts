import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Skill } from '../../entities/skill.entity.js';

@ApiTags('skills')
@Controller('skills')
export class SkillController extends BaseCrudController<Skill> {
  constructor(service: SkillService) {
    super(service);
  }
}
