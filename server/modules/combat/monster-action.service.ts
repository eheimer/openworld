import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterAction } from '../../entities/monster-action.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MonsterActionService extends BaseCrudService<MonsterAction> {
  constructor(
    @InjectRepository(MonsterAction)
    repository: Repository<MonsterAction>,
  ) {
    super(repository, ['monster', 'action']);
  }
}
