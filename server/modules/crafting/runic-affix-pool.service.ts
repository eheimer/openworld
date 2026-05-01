import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunicAffixPool } from '../../entities/runic-affix-pool.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RunicAffixPoolService extends BaseCrudService<RunicAffixPool> {
  constructor(
    @InjectRepository(RunicAffixPool)
    repository: Repository<RunicAffixPool>,
  ) {
    super(repository, []);
  }
}
