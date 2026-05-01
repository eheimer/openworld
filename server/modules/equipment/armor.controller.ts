import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmorService } from './armor.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Armor } from '../../entities/armor.entity.js';

@ApiTags('armors')
@Controller('armors')
export class ArmorController extends BaseCrudController<Armor> {
  constructor(service: ArmorService) {
    super(service);
  }
}
