import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JewelryInstanceAttributeService } from './jewelry-instance-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { JewelryInstanceAttribute } from '../../entities/jewelry-instance-attribute.entity.js';

@ApiTags('jewelry-instance-attributes')
@Controller('jewelry-instance-attributes')
export class JewelryInstanceAttributeController extends BaseCrudController<JewelryInstanceAttribute> {
  constructor(service: JewelryInstanceAttributeService) {
    super(service);
  }
}
