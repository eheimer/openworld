import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorLocationService } from './armor-location.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorLocation } from '../../entities/armor-location.entity.js';

@ApiTags('armor-locations')
@Controller('armor-locations')
export class ArmorLocationController extends BaseCrudController<ArmorLocation> {
  constructor(service: ArmorLocationService) {
    super(service);
  }
}
