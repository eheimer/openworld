import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpellSchoolService } from './spell-school.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { SpellSchool } from '../../entities/spell-school.entity.js';

@ApiTags('spell-schools')
@Controller('spell-schools')
export class SpellSchoolController extends BaseCrudController<SpellSchool> {
  constructor(service: SpellSchoolService) {
    super(service);
  }
}
