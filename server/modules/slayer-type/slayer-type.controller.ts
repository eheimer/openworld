import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SlayerTypeService } from './slayer-type.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { SlayerType } from '../../entities/slayer-type.entity.js';

@ApiTags('slayer-types')
@Controller('slayer-types')
export class SlayerTypeController extends BaseCrudController<SlayerType> {
  constructor(service: SlayerTypeService) {
    super(service);
  }
}
