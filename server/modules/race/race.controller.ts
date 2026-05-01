import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RaceService } from './race.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Race } from '../../entities/race.entity.js';

@ApiTags('races')
@Controller('races')
export class RaceController extends BaseCrudController<Race> {
  constructor(service: RaceService) {
    super(service);
  }
}
