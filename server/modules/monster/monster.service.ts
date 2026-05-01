import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monster } from '../../entities/monster.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MonsterService extends BaseCrudService<Monster> {
  constructor(
    @InjectRepository(Monster)
    repository: Repository<Monster>,
  ) {
    super(repository, ['damageType', 'breathDmgType', 'slayers', 'actions', 'actions.action']);
  }
}
