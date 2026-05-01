import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MaterialTypeService } from './material-type.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { MaterialType } from '../../entities/material-type.entity.js';

@ApiTags('material-types')
@Controller('material-types')
export class MaterialTypeController extends BaseCrudController<MaterialType> {
  constructor(service: MaterialTypeService) {
    super(service);
  }
}
