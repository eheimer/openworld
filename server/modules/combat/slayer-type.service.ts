import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlayerType } from '../../entities/slayer-type.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SlayerTypeService extends BaseCrudService<SlayerType> {
  constructor(
    @InjectRepository(SlayerType)
    repository: Repository<SlayerType>,
  ) {
    super(repository, []);
  }
}
