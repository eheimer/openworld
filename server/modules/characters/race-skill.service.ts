import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaceSkill } from '../../entities/race-skill.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RaceSkillService extends BaseCrudService<RaceSkill> {
  constructor(
    @InjectRepository(RaceSkill)
    repository: Repository<RaceSkill>,
  ) {
    super(repository, ['race', 'skill']);
  }
}
