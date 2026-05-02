import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorInstanceAttributeService } from './armor-instance-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorInstanceAttribute } from '../../entities/armor-instance-attribute.entity.js';

@ApiTags('armor-instance-attributes')
@Controller('armor-instance-attributes')
export class ArmorInstanceAttributeController extends BaseCrudController<ArmorInstanceAttribute> {
  constructor(service: ArmorInstanceAttributeService) {
    super(service);
  }
}
