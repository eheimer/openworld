import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpellbookAttribute } from '../../entities/spellbook-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SpellbookAttributeService extends BaseCrudService<SpellbookAttribute> {
  constructor(
    @InjectRepository(SpellbookAttribute)
    repository: Repository<SpellbookAttribute>,
  ) {
    super(repository, []);
  }
}
