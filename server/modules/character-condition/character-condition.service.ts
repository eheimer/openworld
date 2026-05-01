import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterCondition } from '../../entities/character-condition.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class CharacterConditionService extends BaseCrudService<CharacterCondition> {
  constructor(
    @InjectRepository(CharacterCondition)
    repository: Repository<CharacterCondition>,
  ) {
    super(repository, ['condition', 'character']);
  }
}
