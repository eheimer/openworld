import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicalProperty } from '../../entities/magical-property.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MagicalPropertyService extends BaseCrudService<MagicalProperty> {
  constructor(
    @InjectRepository(MagicalProperty)
    repository: Repository<MagicalProperty>,
  ) {
    super(repository, []);
  }
}
