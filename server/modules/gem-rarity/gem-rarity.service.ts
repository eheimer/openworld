import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GemRarity } from '../../entities/gem-rarity.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class GemRarityService extends BaseCrudService<GemRarity> {
  constructor(
    @InjectRepository(GemRarity)
    repository: Repository<GemRarity>,
  ) {
    super(repository, []);
  }
}
