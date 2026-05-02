import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterSkill } from '../../entities/character-skill.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class CharacterSkillService extends BaseCrudService<CharacterSkill> {
  constructor(
    @InjectRepository(CharacterSkill)
    repository: Repository<CharacterSkill>,
  ) {
    super(repository, ['character', 'skill']);
  }
}
