import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpellbookInstance } from '../../entities/spellbook-instance.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class SpellbookInstanceService extends BaseCrudService<SpellbookInstance> {
  constructor(
    @InjectRepository(SpellbookInstance)
    repository: Repository<SpellbookInstance>,
  ) {
    super(repository, ['inventory', 'heldSlot']);
  }
}
