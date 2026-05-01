import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Action } from '../../entities/action.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ActionService extends BaseCrudService<Action> {
  constructor(
    @InjectRepository(Action)
    repository: Repository<Action>,
  ) {
    super(repository, []);
  }
}
