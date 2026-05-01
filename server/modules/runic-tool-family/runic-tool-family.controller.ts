import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunicToolFamilyService } from './runic-tool-family.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RunicToolFamily } from '../../entities/runic-tool-family.entity.js';

@ApiTags('runic-tool-families')
@Controller('runic-tool-families')
export class RunicToolFamilyController extends BaseCrudController<RunicToolFamily> {
  constructor(service: RunicToolFamilyService) {
    super(service);
  }
}
