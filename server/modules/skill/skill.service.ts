import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../entities/skill.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SkillService extends BaseCrudService<Skill> {
  constructor(
    @InjectRepository(Skill)
    repository: Repository<Skill>,
  ) {
    super(repository, []);
  }
}
