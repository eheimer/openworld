import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunicToolTier } from '../../entities/runic-tool-tier.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RunicToolTierService extends BaseCrudService<RunicToolTier> {
  constructor(
    @InjectRepository(RunicToolTier)
    repository: Repository<RunicToolTier>,
  ) {
    super(repository, []);
  }
}
