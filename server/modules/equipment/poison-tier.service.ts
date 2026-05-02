import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoisonTier } from '../../entities/poison-tier.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class PoisonTierService extends BaseCrudService<PoisonTier> {
  constructor(
    @InjectRepository(PoisonTier)
    repository: Repository<PoisonTier>,
  ) {
    super(repository, []);
  }
}
