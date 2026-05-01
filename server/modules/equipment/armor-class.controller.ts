import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorClassService } from './armor-class.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorClass } from '../../entities/armor-class.entity.js';

@ApiTags('armor-classes')
@Controller('armor-classes')
export class ArmorClassController extends BaseCrudController<ArmorClass> {
  constructor(service: ArmorClassService) {
    super(service);
  }
}
