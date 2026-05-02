import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapService } from './map.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Map } from '../../entities/map.entity.js';

@ApiTags('maps')
@Controller('maps')
export class MapController extends BaseCrudController<Map> {
  constructor(service: MapService) {
    super(service);
  }
}
