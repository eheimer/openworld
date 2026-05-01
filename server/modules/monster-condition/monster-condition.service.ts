import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterCondition } from '../../entities/monster-condition.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MonsterConditionService extends BaseCrudService<MonsterCondition> {
  constructor(
    @InjectRepository(MonsterCondition)
    repository: Repository<MonsterCondition>,
  ) {
    super(repository, ['condition', 'creatureMonsterInstance']);
  }
}
