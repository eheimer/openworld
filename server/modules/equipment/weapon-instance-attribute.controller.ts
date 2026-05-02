import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeaponInstanceAttributeService } from './weapon-instance-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { WeaponInstanceAttribute } from '../../entities/weapon-instance-attribute.entity.js';

@ApiTags('weapon-instance-attributes')
@Controller('weapon-instance-attributes')
export class WeaponInstanceAttributeController extends BaseCrudController<WeaponInstanceAttribute> {
  constructor(service: WeaponInstanceAttributeService) {
    super(service);
  }
}
