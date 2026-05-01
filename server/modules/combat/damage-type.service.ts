import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DamageType } from '../../entities/damage-type.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class DamageTypeService extends BaseCrudService<DamageType> {
  constructor(
    @InjectRepository(DamageType)
    repository: Repository<DamageType>,
  ) {
    super(repository);
  }
}
