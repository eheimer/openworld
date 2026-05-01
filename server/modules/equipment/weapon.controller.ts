import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeaponService } from './weapon.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Weapon } from '../../entities/weapon.entity.js';

@ApiTags('weapons')
@Controller('weapons')
export class WeaponController extends BaseCrudController<Weapon> {
  constructor(service: WeaponService) {
    super(service);
  }
}
