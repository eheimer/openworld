import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReloadFamily } from '../../entities/reload-family.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ReloadFamilyService extends BaseCrudService<ReloadFamily> {
  constructor(
    @InjectRepository(ReloadFamily)
    repository: Repository<ReloadFamily>,
  ) {
    super(repository, []);
  }
}
