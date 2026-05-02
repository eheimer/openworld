import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShieldInstanceService } from './shield-instance.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ShieldInstance } from '../../entities/shield-instance.entity.js';

@ApiTags('shield-instances')
@Controller('shield-instances')
export class ShieldInstanceController extends BaseCrudController<ShieldInstance> {
  constructor(service: ShieldInstanceService) {
    super(service);
  }
}
