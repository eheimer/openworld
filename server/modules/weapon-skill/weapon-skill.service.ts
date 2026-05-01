import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeaponSkill } from '../../entities/weapon-skill.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class WeaponSkillService extends BaseCrudService<WeaponSkill> {
  constructor(
    @InjectRepository(WeaponSkill)
    repository: Repository<WeaponSkill>,
  ) {
    super(repository, []);
  }
}
