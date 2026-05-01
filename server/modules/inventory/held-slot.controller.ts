import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HeldSlotService } from './held-slot.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { HeldSlot } from '../../entities/held-slot.entity.js';

@ApiTags('held-slots')
@Controller('held-slots')
export class HeldSlotController extends BaseCrudController<HeldSlot> {
  constructor(service: HeldSlotService) {
    super(service);
  }
}
