import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShieldService } from './shield.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Shield } from '../../entities/shield.entity.js';

@ApiTags('shields')
@Controller('shields')
export class ShieldController extends BaseCrudController<Shield> {
  constructor(service: ShieldService) {
    super(service);
  }
}
