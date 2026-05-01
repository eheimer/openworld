import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeaponPoisonService } from './weapon-poison.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { WeaponPoison } from '../../entities/weapon-poison.entity.js';

@ApiTags('weapon-poisons')
@Controller('weapon-poisons')
export class WeaponPoisonController extends BaseCrudController<WeaponPoison> {
  constructor(service: WeaponPoisonService) {
    super(service);
  }
}
