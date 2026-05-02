import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JewelryInstanceService } from './jewelry-instance.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { JewelryInstance } from '../../entities/jewelry-instance.entity.js';

@ApiTags('jewelry-instances')
@Controller('jewelry-instances')
export class JewelryInstanceController extends BaseCrudController<JewelryInstance> {
  constructor(service: JewelryInstanceService) {
    super(service);
  }
}
