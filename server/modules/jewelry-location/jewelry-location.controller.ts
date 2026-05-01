import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JewelryLocationService } from './jewelry-location.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { JewelryLocation } from '../../entities/jewelry-location.entity.js';

@ApiTags('jewelry-locations')
@Controller('jewelry-locations')
export class JewelryLocationController extends BaseCrudController<JewelryLocation> {
  constructor(service: JewelryLocationService) {
    super(service);
  }
}
