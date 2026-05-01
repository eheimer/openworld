import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spell } from '../../entities/spell.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SpellService extends BaseCrudService<Spell> {
  constructor(
    @InjectRepository(Spell)
    repository: Repository<Spell>,
  ) {
    super(repository, ['spellSchool']);
  }
}
