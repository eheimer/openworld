import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorBandService } from './armor-band.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorBand } from '../../entities/armor-band.entity.js';

@ApiTags('armor-bands')
@Controller('armor-bands')
export class ArmorBandController extends BaseCrudController<ArmorBand> {
  constructor(service: ArmorBandService) {
    super(service);
  }
}
