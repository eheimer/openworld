import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from '../../entities/battle.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class BattleService extends BaseCrudService<Battle> {
  constructor(
    @InjectRepository(Battle)
    repository: Repository<Battle>,
  ) {
    super(repository, ['game', 'initiator']);
  }
}
