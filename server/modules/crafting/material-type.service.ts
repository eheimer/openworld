import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialType } from '../../entities/material-type.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MaterialTypeService extends BaseCrudService<MaterialType> {
  constructor(
    @InjectRepository(MaterialType)
    repository: Repository<MaterialType>,
  ) {
    super(repository, []);
  }
}
