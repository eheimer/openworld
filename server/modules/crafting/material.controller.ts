import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MaterialService } from './material.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Material } from '../../entities/material.entity.js';

@ApiTags('materials')
@Controller('materials')
export class MaterialController extends BaseCrudController<Material> {
  constructor(service: MaterialService) {
    super(service);
  }
}
