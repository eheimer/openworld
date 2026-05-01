import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpellSchool } from '../../entities/spell-school.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SpellSchoolService extends BaseCrudService<SpellSchool> {
  constructor(
    @InjectRepository(SpellSchool)
    repository: Repository<SpellSchool>,
  ) {
    super(repository, ['skill']);
  }
}
