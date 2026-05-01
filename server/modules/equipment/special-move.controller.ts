import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialMoveService } from './special-move.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { SpecialMove } from '../../entities/special-move.entity.js';

@ApiTags('special-moves')
@Controller('special-moves')
export class SpecialMoveController extends BaseCrudController<SpecialMove> {
  constructor(service: SpecialMoveService) {
    super(service);
  }
}
