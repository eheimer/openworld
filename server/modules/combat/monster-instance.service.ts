import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterInstance } from '../../entities/monster-instance.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MonsterInstanceService extends BaseCrudService<MonsterInstance> {
  constructor(
    @InjectRepository(MonsterInstance)
    repository: Repository<MonsterInstance>,
  ) {
    super(repository, ['monster', 'character']);
  }
}
