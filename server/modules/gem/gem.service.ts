import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gem } from '../../entities/gem.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class GemService extends BaseCrudService<Gem> {
  constructor(
    @InjectRepository(Gem)
    repository: Repository<Gem>,
  ) {
    super(repository, ['rarity', 'category']);
  }
}
