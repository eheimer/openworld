import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MaterialOverlayService } from './material-overlay.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { MaterialOverlay } from '../../entities/material-overlay.entity.js';

@ApiTags('material-overlays')
@Controller('material-overlays')
export class MaterialOverlayController extends BaseCrudController<MaterialOverlay> {
  constructor(service: MaterialOverlayService) {
    super(service);
  }
}
