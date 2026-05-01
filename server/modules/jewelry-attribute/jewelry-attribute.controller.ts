import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JewelryAttributeService } from './jewelry-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { JewelryAttribute } from '../../entities/jewelry-attribute.entity.js';

@ApiTags('jewelry-attributes')
@Controller('jewelry-attributes')
export class JewelryAttributeController extends BaseCrudController<JewelryAttribute> {
  constructor(service: JewelryAttributeService) {
    super(service);
  }
}
