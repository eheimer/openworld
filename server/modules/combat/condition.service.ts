import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condition } from '../../entities/condition.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ConditionService extends BaseCrudService<Condition> {
  constructor(
    @InjectRepository(Condition)
    repository: Repository<Condition>,
  ) {
    super(repository, ['damageType']);
  }
}
