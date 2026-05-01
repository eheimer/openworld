import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReloadFamilyService } from './reload-family.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { ReloadFamily } from '../../entities/reload-family.entity.js';

@ApiTags('reload-families')
@Controller('reload-families')
export class ReloadFamilyController extends BaseCrudController<ReloadFamily> {
  constructor(service: ReloadFamilyService) {
    super(service);
  }
}
