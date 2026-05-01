import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LootTable } from '../../entities/loot-table.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class LootTableService extends BaseCrudService<LootTable> {
  constructor(
    @InjectRepository(LootTable)
    repository: Repository<LootTable>,
  ) {
    super(repository, ['item']);
  }
}
