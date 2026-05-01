import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeaponAttributeService } from './weapon-attribute.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { WeaponAttribute } from '../../entities/weapon-attribute.entity.js';

@ApiTags('weapon-attributes')
@Controller('weapon-attributes')
export class WeaponAttributeController extends BaseCrudController<WeaponAttribute> {
  constructor(service: WeaponAttributeService) {
    super(service);
  }
}
