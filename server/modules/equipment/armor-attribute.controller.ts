import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorAttributeService } from './armor-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorAttribute } from '../../entities/armor-attribute.entity.js';

@ApiTags('armor-attributes')
@Controller('armor-attributes')
export class ArmorAttributeController extends BaseCrudController<ArmorAttribute> {
  constructor(service: ArmorAttributeService) {
    super(service);
  }
}
