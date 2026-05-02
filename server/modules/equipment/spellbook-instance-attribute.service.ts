import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpellbookInstanceAttribute } from '../../entities/spellbook-instance-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SpellbookInstanceAttributeService extends BaseCrudService<SpellbookInstanceAttribute> {
  constructor(
    @InjectRepository(SpellbookInstanceAttribute)
    repository: Repository<SpellbookInstanceAttribute>,
  ) {
    super(repository, ['attribute', 'skill', 'slayer', 'spellbook']);
  }
}
