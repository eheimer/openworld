import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorInstanceService } from './armor-instance.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ArmorInstance } from '../../entities/armor-instance.entity.js';

@ApiTags('armor-instances')
@Controller('armor-instances')
export class ArmorInstanceController extends BaseCrudController<ArmorInstance> {
  constructor(service: ArmorInstanceService) {
    super(service);
  }
}
