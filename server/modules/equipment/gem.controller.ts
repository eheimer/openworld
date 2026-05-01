import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GemService } from './gem.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Gem } from '../../entities/gem.entity.js';

@ApiTags('gems')
@Controller('gems')
export class GemController extends BaseCrudController<Gem> {
  constructor(service: GemService) {
    super(service);
  }
}
