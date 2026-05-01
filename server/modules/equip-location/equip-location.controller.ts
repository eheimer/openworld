import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EquipLocationService } from './equip-location.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { EquipLocation } from '../../entities/equip-location.entity.js';

@ApiTags('equip-locations')
@Controller('equip-locations')
export class EquipLocationController extends BaseCrudController<EquipLocation> {
  constructor(service: EquipLocationService) {
    super(service);
  }
}
