import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MagicalPropertyService } from './magical-property.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { MagicalProperty } from '../../entities/magical-property.entity.js';

@ApiTags('magical-properties')
@Controller('magical-properties')
export class MagicalPropertyController extends BaseCrudController<MagicalProperty> {
  constructor(service: MagicalPropertyService) {
    super(service);
  }
}
