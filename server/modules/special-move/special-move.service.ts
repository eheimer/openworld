import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialMove } from '../../entities/special-move.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SpecialMoveService extends BaseCrudService<SpecialMove> {
  constructor(
    @InjectRepository(SpecialMove)
    repository: Repository<SpecialMove>,
  ) {
    super(repository, ['effectCondition']);
  }
}
