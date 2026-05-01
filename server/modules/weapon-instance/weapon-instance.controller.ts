import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeaponInstanceService } from './weapon-instance.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { WeaponInstance } from '../../entities/weapon-instance.entity.js';

@ApiTags('weapon-instances')
@Controller('weapon-instances')
export class WeaponInstanceController extends BaseCrudController<WeaponInstance> {
  constructor(service: WeaponInstanceService) {
    super(service);
  }
}
